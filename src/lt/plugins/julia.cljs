(ns lt.plugins.julia
  (:require [lt.object :as object]
            [lt.objs.eval :as eval]
            [lt.objs.console :as console]
            [lt.objs.command :as cmd]
            [lt.objs.clients.tcp :as tcp]
            [lt.objs.sidebar.clients :as scl]
            [lt.objs.dialogs :as dialogs]
            [lt.objs.files :as files]
            [lt.objs.popup :as popup]
            [lt.objs.platform :as platform]
            [lt.objs.editor :as ed]
            [lt.objs.tabs :as tabs]
            [lt.objs.plugins :as plugins]
            [lt.plugins.watches :as watches]
            [lt.objs.proc :as proc]
            [clojure.string :as string]
            [lt.objs.clients :as clients]
            [lt.objs.notifos :as notifos]
            [lt.util.load :as load]
            [lt.util.cljs :refer [js->clj]])
  (:require-macros [lt.macros :refer [behavior defui]]))

(def shell (load/node-module "shelljs"))
(def plugin-path (get-in (plugins/available-plugins) ["Julia" :dir] "."))
(def julia-path (files/join plugin-path "julia-src/main.jl"))

(defn check-client [obj]
  (assoc obj :julia-client (files/exists? julia-path)))

(defn check-julia [obj]
  (assoc obj :julia (or (:julia-exe @julia)
                        (.which shell "julia"))))

(behavior ::on-out
          :triggers #{:proc.out}
          :reaction (fn [this data]
                      (prn "on-out")
                      (let [out (.toString data)]
                        (prn out)
                        (object/update! this [:buffer] str out)
                        (when (> (.indexOf out "Connected") -1)
                          (do
                            (notifos/done-working "Connected")
                            (object/merge! this {:connected true}))))))

(behavior ::on-error
          :triggers #{:proc.error}
          :reaction (fn [this data]
                      (prn "on-error")
                      (let [out (.toString data)]
                        (prn "on-error: " data)
                        (when-not (> (.indexOf (:buffer @this) "Connected") -1)
                          (object/update! this [:buffer] str out)))))

(behavior ::on-exit
          :triggers #{:proc.exit}
          :reaction (fn [this data]
                      (prn "on-exit: " data)
                      (when-not (:connected @this)
                        (notifos/done-working "Error!")
                        (popup/popup! {:header "Error connecting to Julia"
                                       :body [:span "There was an issue connnecting to IJulia.
                                                     Here's what we got:" [:pre (:buffer @this)]]
                                       :buttons [{:label "close"}]})
                        (clients/rem! (:client @this)))
                      (proc/kill-all (:procs @this))
                      (object/destroy! this)))

(object/object* ::connecting-notifier
                :triggers []
                :behaviors [::on-out ::on-error ::on-exit]
                :init (fn [this client]
                        (object/merge! this {:client client :buffer ""})
                        nil))

(defn escape-spaces [s]
  (if (= files/separator "\\")
    (str "\"" s "\"")
    s))

(defn run-julia
  [{:keys [path project-path name client env] :as info}]
  (let [n (notifos/working "Connecting...")
        obj (object/create ::connecting-notifier client)
        env {}]
    (proc/exec {:command (or (:julia-exe @julia) "julia")
                :args [(escape-spaces julia-path) tcp/port (clients/->id client)]
                :cwd project-path
                :env env
                :obj obj})))

(defn find-project [obj]
  (let [p (:path obj)
        roots (files/get-roots)]
    (loop [cur p
           prev ""]
      (if (or (empty? cur)
              (roots cur)
              (= cur prev))
        (assoc obj :project-path nil)
        (assoc obj :project-path cur)))))


(defn notify [obj]
  (let [{:keys  [julia project-path julia-client client]} obj]
    (cond
     (or (not julia) (empty? julia))
       (do
         (when client
           (clients/rem! client))
         (notifos/done-working)
         (popup/popup! {:header "Julia was not found!"
                        :body "In order to eval a Julia file, Julia must first be installed"
                        :buttons [{:label "Download Julia"
                                   :action (fn []
                                             (platform/open "http://www.julialang.org/downloads"))}
                                  {:label "ok"}]}))
     (not project-path)
       (do
         (when client
           (clients/rem! client))
         (notifos/done-working)
         (popup/popup! {:header "Could not eval Julia file"
                        :body "To eval the file, the file must be first be saved to disk"
                        :buttons [{:label "Save this file"
                                   :action (fn []
                                             (cmd/exec! :save)
                                             (try-connect obj))}
                                  {:label "Cancel"
                                   :action (fn [])}]}))
     :else (run-julia obj))
    obj))

(defn check-all [obj]
  (-> obj
      (check-julia)
      (check-client)
      (find-project)
      (notify)))

(defn try-connect [{:keys [info]}]
  (prn "try-connect: ws - ", tcp/port)
  (let [path (:path info)
        client (clients/client! :julia.client)]
    (check-all {:path path
                :client client})
    client))

(defn julia-watch [meta, src]
  (let [meta (js/JSON.stringify (clj->js meta))]
    ;; TODO
    (str src)))

(behavior ::julia-result
          :triggers #{:editor.eval.julia.result}
          :reaction (fn [editor res]
                      (prn "julia-result")
                      (notifos/done-working)
                      (object/raise editor :editor.result (:result res) {:line (:end (:meta res))
                                                                         :start-line (-> res :meta :start)})))
(behavior ::julia-success
          :triggers #{:editor.eval.julia.success}
          :reaction (fn [editor res]
                      (notifos/done-working)
                      (object/raise editor :editor.result "✓" {:line (-> res :meta :end)
                                                                :start-line (-> res :meta :start)})))
(behavior ::julia-exception
          :triggers #{:editor.eval.julia.exception}
          :reaction (fn [editor ex]
                      (notifos/done-working)
                      (object/raise editor :editor.exception (:ex ex) {:line (-> ex :meta :end)})))

(behavior ::julia-printer
          :triggers #{:editor.eval.julia.print}
          :reaction (fn [editor p]
                      (console/loc-log {:file (files/basename (:file p))
                                        :line "stdout"
                                        :content (:msg p)})))
(behavior ::on-eval
          :triggers #{:eval}
          :reaction (fn [editor]
                      (prn "on-eval")
                      (object/raise julia :eval! {:origin editor
                                                  :info (assoc (@editor :info)
                                                  :code (watches/watched-range editor nil nil julia-watch))})))
(behavior ::on-eval.one
          :triggers #{:eval.one}
          :reaction (fn [editor]
                      (prn "on-eval.one")
                      (let [code (watches/watched-range editor nil nil julia-watch)
                            pos (ed/->cursor editor)
                            info (:info @editor)
                            info (if (ed/selection? editor)
                                   (assoc info
                                     :code (ed/selection editor)
                                     :meta {:start (-> (ed/->cursor editor "start") :line)
                                            :end (-> (ed/->cursor editor "end") :line)})
                                   (assoc info :pos pos :code code))]
                        (object/raise julia :eval! {:origin editor
                                                    :info info}))))
(behavior ::eval!
          :triggers #{:eval!}
          :reaction (fn [this event]
                      (prn "eval!")
                      (let [{:keys [info origin]} event
                            client (-> @origin :client :default)]
                        (notifos/working "")
                        (clients/send (eval/get-client! {:command :editor.eval.julia
                                                         :origin origin
                                                         :info info
                                                         :create try-connect})
                                      :editor.eval.julia
                                      info
                                      :only
                                      origin))))

;; define the toplevel julia object
(object/object* ::julia-lang
                :tags #{:julia.lang})

(def julia (object/create ::julia-lang))

julia

(behavior ::connect
          :triggers #{:connect}
          :reaction (fn [this path]
                      (try-connect {:info {:path path}})))

(scl/add-connector {:name "Julia"
                    :desc "Select a directory to serve as the root of your julia project"
                    :connect (fn []
                               (dialogs/dir julia :connect))})

(behavior ::julia-exe
          :triggers #{:object.instant}
          :desc "Julia: set the path to julia for clients"
          :type :user
          :exclusive true
          :params [{:label "path"
                    :type :path}]
          :reaction (fn [this exe]
                      (object/merge! julia {:julia-exe exe})))
