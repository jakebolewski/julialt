if(!lt.util.load.provided_QMARK_('lt.plugins.julia')) {
goog.provide('lt.plugins.julia');
goog.require('cljs.core');
goog.require('lt.util.cljs');
goog.require('lt.objs.plugins');
goog.require('lt.objs.files');
goog.require('lt.objs.platform');
goog.require('lt.objs.tabs');
goog.require('lt.objs.popup');
goog.require('lt.objs.dialogs');
goog.require('lt.objs.popup');
goog.require('lt.objs.notifos');
goog.require('lt.objs.proc');
goog.require('lt.objs.notifos');
goog.require('clojure.string');
goog.require('lt.util.cljs');
goog.require('lt.objs.command');
goog.require('lt.objs.platform');
goog.require('lt.objs.files');
goog.require('lt.objs.clients.tcp');
goog.require('lt.objs.sidebar.clients');
goog.require('lt.objs.plugins');
goog.require('lt.plugins.watches');
goog.require('lt.objs.eval');
goog.require('lt.objs.clients');
goog.require('lt.objs.clients.tcp');
goog.require('lt.util.load');
goog.require('clojure.string');
goog.require('lt.plugins.watches');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.object');
goog.require('lt.objs.dialogs');
goog.require('lt.util.load');
goog.require('lt.objs.console');
goog.require('lt.objs.proc');
goog.require('lt.objs.tabs');
goog.require('lt.objs.console');
goog.require('lt.objs.eval');
goog.require('lt.objs.clients');
goog.require('lt.objs.sidebar.clients');
goog.require('lt.objs.command');
goog.require('lt.objs.editor');

lt.plugins.julia.shell = lt.util.load.node_module.call(null,"shelljs");

lt.plugins.julia.jl_path = lt.objs.files.join.call(null,lt.objs.plugins._STAR_plugin_dir_STAR_,"julia-src/main.jl");

lt.plugins.julia.check_client = (function check_client(obj){return cljs.core.assoc.call(null,obj,new cljs.core.Keyword(null,"julia-client","julia-client",2943204913),lt.objs.files.exists_QMARK_.call(null,lt.plugins.julia.jl_path));
});

lt.plugins.julia.check_client.call(null,cljs.core.PersistentArrayMap.EMPTY);

lt.plugins.julia.check_ijulia = (function check_ijulia(){var or__6797__auto__ = new cljs.core.Keyword(null,"ijulia-exe","ijulia-exe",1451790535).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.julia.julia));if(cljs.core.truth_(or__6797__auto__))
{return or__6797__auto__;
} else
{return lt.plugins.julia.shell.which("julia");
}
});

lt.plugins.julia.check_ijulia.call(null);

lt.plugins.julia.find_project = (function find_project(obj){var p = new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(obj);var roots = lt.objs.files.get_roots.call(null);var cur = p;var prev = "";while(true){
if(cljs.core.truth_((function (){var or__6797__auto__ = cljs.core.empty_QMARK_.call(null,cur);if(or__6797__auto__)
{return or__6797__auto__;
} else
{var or__6797__auto____$1 = roots.call(null,cur);if(cljs.core.truth_(or__6797__auto____$1))
{return or__6797__auto____$1;
} else
{return cljs.core._EQ_.call(null,cur,prev);
}
}
})()))
{return cljs.core.assoc.call(null,obj,new cljs.core.Keyword(null,"project-path","project-path",1907176907),null);
} else
{return cljs.core.assoc.call(null,obj,new cljs.core.Keyword(null,"project-path","project-path",1907176907),cur);
}
break;
}
});

lt.plugins.julia.try_connect = (function try_connect(obj){return cljs.core.prn.call(null,"got here");
});

lt.plugins.julia.run_julia = (function run_julia(obj){return cljs.core.prn.call(null,"got here");
});

lt.plugins.julia.notify = (function notify(obj){var map__8418 = obj;var map__8418__$1 = ((cljs.core.seq_QMARK_.call(null,map__8418))?cljs.core.apply.call(null,cljs.core.hash_map,map__8418):map__8418);var client = cljs.core.get.call(null,map__8418__$1,new cljs.core.Keyword(null,"client","client",3951159101));var ijulia_client = cljs.core.get.call(null,map__8418__$1,new cljs.core.Keyword(null,"ijulia-client","ijulia-client",2200660250));var project_path = cljs.core.get.call(null,map__8418__$1,new cljs.core.Keyword(null,"project-path","project-path",1907176907));var ijulia = cljs.core.get.call(null,map__8418__$1,new cljs.core.Keyword(null,"ijulia","ijulia",4121451010));if((cljs.core.not.call(null,lt.plugins.julia.julia)) || (cljs.core.empty_QMARK_.call(null,lt.plugins.julia.python)))
{lt.objs.clients.rem_BANG_.call(null,client);
lt.objs.notifos.done_working.call(null);
lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",4087600639),"Julia was not found!",new cljs.core.Keyword(null,"body","body",1016933652),"In order to eval a Julia file, Julia must be installed",new cljs.core.Keyword(null,"buttons","buttons",1255256819),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"Download Julia",new cljs.core.Keyword(null,"action","action",3885920680),(function (){return lt.objs.platform.open.call(null,"http://www.julialang.org/downloads");
})], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1116631654),"ok"], null)], null)], null));
} else
{if(cljs.core.not.call(null,project_path))
{lt.objs.clients.rem_BANG_.call(null,client);
lt.objs.notifos.done_working.call(null);
lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",4087600639),"Could not eval Julia file",new cljs.core.Keyword(null,"body","body",1016933652),"To eval the file, the file must be first be saved to disk",new cljs.core.Keyword(null,"buttons","buttons",1255256819),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"Save this file",new cljs.core.Keyword(null,"action","action",3885920680),(function (){lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"save","save",1017427183));
return lt.plugins.julia.try_connect.call(null,obj);
})], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"Cancel",new cljs.core.Keyword(null,"action","action",3885920680),(function (){return null;
})], null)], null)], null));
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{lt.plugins.julia.run_julia.call(null,obj);
} else
{}
}
}
return obj;
});

lt.plugins.julia.notify.call(null,cljs.core.PersistentArrayMap.EMPTY);

lt.plugins.julia.__BEH__connect = (function __BEH__connect(this$,path){return cljs.core.prn.call(null,path);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.julia","connect","lt.plugins.julia/connect",3202118946),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.julia.__BEH__connect,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"connect","connect",1965255772),null], null), null));

lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.plugins.julia","julia-lang","lt.plugins.julia/julia-lang",3761852442),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"julia.lang","julia.lang",1405919445),null], null), null));

lt.plugins.julia.julia = lt.object.create.call(null,new cljs.core.Keyword("lt.plugins.julia","julia-lang","lt.plugins.julia/julia-lang",3761852442));

lt.objs.sidebar.clients.add_connector.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1017277949),"Julia",new cljs.core.Keyword(null,"desc","desc",1016984067),"Select a directory to serve as the root of your julia project",new cljs.core.Keyword(null,"connect","connect",1965255772),(function (){return lt.objs.dialogs.dir.call(null,lt.plugins.julia.python,new cljs.core.Keyword(null,"connect","connect",1965255772));
})], null));

lt.plugins.julia.__BEH__ijulia_exe = (function __BEH__ijulia_exe(this$,exe){return lt.object.merge_BANG_.call(null,lt.plugins.julia.julia,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ijulia-exe","ijulia-exe",1451790535),exe], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.julia","ijulia-exe","lt.plugins.julia/ijulia-exe",4253243467),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.julia.__BEH__ijulia_exe,new cljs.core.Keyword(null,"desc","desc",1016984067),"Julia: set the path to ijulia for clients",new cljs.core.Keyword(null,"params","params",4313443576),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"path",new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"path","path",1017337751)], null)], null),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",773332388),null], null), null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"user","user",1017503549),new cljs.core.Keyword(null,"exclusive","exclusive",2700522000),true);

}

//# sourceMappingURL=