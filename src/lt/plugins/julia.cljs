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
(def jl-path (files/join plugins/*plugin-dir* "julia-src/main.jl"))

(defn check-client [obj]
  (assoc obj :julia-client (files/exists? jl-path)))

(check-client {})

(defn check-ijulia [] (or (:ijulia-exe @julia)
                          (.which shell "julia")))

(check-ijulia)

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

(defn try-connect [obj]
  (prn "got here")
)

(defn run-julia [obj]
  (prn "got here")
  )


(defn notify [obj]
  (let [{:keys  [ijulia project-path ijulia-client client]} obj]
    (cond
     (or (not julia) (empty? python))
       (do
         (clients/rem! client)
         (notifos/done-working)
         (popup/popup! {:header "Julia was not found!"
                        :body "In order to eval a Julia file, Julia must be installed"
                        :buttons [{:label "Download Julia"
                                   :action (fn []
                                             (platform/open "http://www.julialang.org/downloads"))}
                                  {:label "ok"}]}))
     (not project-path)
       (do
         (clients/rem! client)
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

(notify {})

(behavior ::connect
            :triggers #{:connect}
            :reaction (fn [this path]
                        (prn path)))

(object/object* ::julia-lang
                :tags #{:julia.lang})

(def julia (object/create ::julia-lang))

(scl/add-connector {:name "Julia"
                    :desc "Select a directory to serve as the root of your julia project"
                    :connect (fn []
                               (dialogs/dir python :connect))})

(behavior ::ijulia-exe
          :triggers #{:object.instant}
          :desc "Julia: set the path to ijulia for clients"
          :type :user
          :exclusive true
          :params [{:label "path"
                    :type :path}]
          :reaction (fn [this exe]
                      (object/merge! julia {:ijulia-exe exe})))
