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

lt.plugins.julia.plugin_path = cljs.core.get_in.call(null,lt.objs.plugins.available_plugins.call(null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Julia",new cljs.core.Keyword(null,"dir","dir",1014003711)], null),".");

lt.plugins.julia.julia_path = lt.objs.files.join.call(null,lt.plugins.julia.plugin_path,"julia-src/main.jl");

lt.plugins.julia.check_client = (function check_client(obj){return cljs.core.assoc.call(null,obj,new cljs.core.Keyword(null,"julia-client","julia-client",2943204913),lt.objs.files.exists_QMARK_.call(null,lt.plugins.julia.julia_path));
});

lt.plugins.julia.check_julia = (function check_julia(obj){return cljs.core.assoc.call(null,obj,new cljs.core.Keyword(null,"julia","julia",1115390155),(function (){var or__6741__auto__ = new cljs.core.Keyword(null,"julia-exe","julia-exe",610872080).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.julia.julia));if(cljs.core.truth_(or__6741__auto__))
{return or__6741__auto__;
} else
{return lt.plugins.julia.shell.which("julia");
}
})());
});

lt.plugins.julia.__BEH__on_out = (function __BEH__on_out(this$,data){cljs.core.prn.call(null,"on-out");
var out = data.toString();lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"buffer","buffer",3930752946)], null),cljs.core.str,out);
if((out.indexOf("Connected") > -1))
{lt.objs.notifos.done_working.call(null,"Connected");
return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"connected","connected",4729661051),true], null));
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.julia","on-out","lt.plugins.julia/on-out",1410778016),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.julia.__BEH__on_out,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"proc.out","proc.out",4302083112),null], null), null));

lt.plugins.julia.__BEH__on_error = (function __BEH__on_error(this$,data){cljs.core.prn.call(null,"on-error");
var out = data.toString();if((new cljs.core.Keyword(null,"buffer","buffer",3930752946).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)).indexOf("Connected") > -1))
{return null;
} else
{cljs.core.prn.call(null,"out");
return lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"buffer","buffer",3930752946)], null),cljs.core.str,out);
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.julia","on-error","lt.plugins.julia/on-error",3750071698),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.julia.__BEH__on_error,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"proc.error","proc.error",4143512802),null], null), null));

lt.plugins.julia.__BEH__on_exit = (function __BEH__on_exit(this$,data){cljs.core.prn.call(null,"on-exit");
if(cljs.core.truth_(new cljs.core.Keyword(null,"connected","connected",4729661051).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))))
{} else
{lt.objs.notifos.done_working.call(null,"Error!");
lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",4087600639),"Error connecting to Julia",new cljs.core.Keyword(null,"body","body",1016933652),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1017440956),"There was an issue connnecting to IJulia.\n                                                     Here's what we got:",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre","pre",1014015509),new cljs.core.Keyword(null,"buffer","buffer",3930752946).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))], null)], null),new cljs.core.Keyword(null,"buttons","buttons",1255256819),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1116631654),"close"], null)], null)], null));
cljs.core.prn.call(null,new cljs.core.Keyword(null,"client","client",3951159101).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
lt.objs.clients.rem_BANG_.call(null,new cljs.core.Keyword(null,"client","client",3951159101).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
}
lt.objs.proc.kill_all.call(null,new cljs.core.Keyword(null,"procs","procs",1120844623).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
return lt.object.destroy_BANG_.call(null,this$);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.julia","on-exit","lt.plugins.julia/on-exit",1230650692),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.julia.__BEH__on_exit,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"proc.exit","proc.exit",4162906152),null], null), null));

lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.plugins.julia","connecting-notifier","lt.plugins.julia/connecting-notifier",3823085841),new cljs.core.Keyword(null,"triggers","triggers",2516997421),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"behaviors","behaviors",607554515),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.plugins.julia","on-out","lt.plugins.julia/on-out",1410778016),new cljs.core.Keyword("lt.plugins.julia","on-error","lt.plugins.julia/on-error",3750071698),new cljs.core.Keyword("lt.plugins.julia","on-exit","lt.plugins.julia/on-exit",1230650692)], null),new cljs.core.Keyword(null,"init","init",1017141378),(function (this$,client){lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"client","client",3951159101),client,new cljs.core.Keyword(null,"buffer","buffer",3930752946),""], null));
return this$;
}));

lt.plugins.julia.escape_spaces = (function escape_spaces(s){if(cljs.core._EQ_.call(null,lt.objs.files.separator,"\\"))
{return [cljs.core.str("\""),cljs.core.str(s),cljs.core.str("\"")].join('');
} else
{return s;
}
});

lt.plugins.julia.run_julia = (function run_julia(p__8237){var map__8239 = p__8237;var map__8239__$1 = ((cljs.core.seq_QMARK_.call(null,map__8239))?cljs.core.apply.call(null,cljs.core.hash_map,map__8239):map__8239);var info = map__8239__$1;var env = cljs.core.get.call(null,map__8239__$1,new cljs.core.Keyword(null,"env","env",1014004831));var client = cljs.core.get.call(null,map__8239__$1,new cljs.core.Keyword(null,"client","client",3951159101));var name = cljs.core.get.call(null,map__8239__$1,new cljs.core.Keyword(null,"name","name",1017277949));var project_path = cljs.core.get.call(null,map__8239__$1,new cljs.core.Keyword(null,"project-path","project-path",1907176907));var path = cljs.core.get.call(null,map__8239__$1,new cljs.core.Keyword(null,"path","path",1017337751));var n = lt.objs.notifos.working.call(null,"Connecting...");var obj = lt.object.create.call(null,new cljs.core.Keyword("lt.plugins.julia","connecting-notifier","lt.plugins.julia/connecting-notifier",3823085841),client);var env__$1 = cljs.core.PersistentArrayMap.EMPTY;return lt.objs.proc.exec.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"command","command",1964298941),(function (){var or__6741__auto__ = new cljs.core.Keyword(null,"julia-exe","julia-exe",610872080).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.julia.julia));if(cljs.core.truth_(or__6741__auto__))
{return or__6741__auto__;
} else
{return "julia";
}
})(),new cljs.core.Keyword(null,"args","args",1016906831),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.plugins.julia.escape_spaces.call(null,lt.plugins.julia.julia_path),lt.objs.clients.tcp.port,lt.objs.clients.__GT_id.call(null,client)], null),new cljs.core.Keyword(null,"cwd","cwd",1014003170),project_path,new cljs.core.Keyword(null,"env","env",1014004831),env__$1,new cljs.core.Keyword(null,"obj","obj",1014014057),obj], null));
});

lt.plugins.julia.find_project = (function find_project(obj){var p = new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(obj);var roots = lt.objs.files.get_roots.call(null);var cur = p;var prev = "";while(true){
if(cljs.core.truth_((function (){var or__6741__auto__ = cljs.core.empty_QMARK_.call(null,cur);if(or__6741__auto__)
{return or__6741__auto__;
} else
{var or__6741__auto____$1 = roots.call(null,cur);if(cljs.core.truth_(or__6741__auto____$1))
{return or__6741__auto____$1;
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

lt.plugins.julia.notify = (function notify(obj){var map__8241 = obj;var map__8241__$1 = ((cljs.core.seq_QMARK_.call(null,map__8241))?cljs.core.apply.call(null,cljs.core.hash_map,map__8241):map__8241);var client = cljs.core.get.call(null,map__8241__$1,new cljs.core.Keyword(null,"client","client",3951159101));var julia_client = cljs.core.get.call(null,map__8241__$1,new cljs.core.Keyword(null,"julia-client","julia-client",2943204913));var project_path = cljs.core.get.call(null,map__8241__$1,new cljs.core.Keyword(null,"project-path","project-path",1907176907));var julia = cljs.core.get.call(null,map__8241__$1,new cljs.core.Keyword(null,"julia","julia",1115390155));if((cljs.core.not.call(null,julia)) || (cljs.core.empty_QMARK_.call(null,julia)))
{if(cljs.core.truth_(client))
{lt.objs.clients.rem_BANG_.call(null,client);
} else
{}
lt.objs.notifos.done_working.call(null);
lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",4087600639),"Julia was not found!",new cljs.core.Keyword(null,"body","body",1016933652),"In order to eval a Julia file, Julia must first be installed",new cljs.core.Keyword(null,"buttons","buttons",1255256819),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"Download Julia",new cljs.core.Keyword(null,"action","action",3885920680),(function (){return lt.objs.platform.open.call(null,"http://www.julialang.org/downloads");
})], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1116631654),"ok"], null)], null)], null));
} else
{if(cljs.core.not.call(null,project_path))
{if(cljs.core.truth_(client))
{lt.objs.clients.rem_BANG_.call(null,client);
} else
{}
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

lt.plugins.julia.check_all = (function check_all(obj){return lt.plugins.julia.notify.call(null,lt.plugins.julia.find_project.call(null,lt.plugins.julia.check_client.call(null,lt.plugins.julia.check_julia.call(null,obj))));
});

lt.plugins.julia.try_connect = (function try_connect(p__8242){var map__8244 = p__8242;var map__8244__$1 = ((cljs.core.seq_QMARK_.call(null,map__8244))?cljs.core.apply.call(null,cljs.core.hash_map,map__8244):map__8244);var info = cljs.core.get.call(null,map__8244__$1,new cljs.core.Keyword(null,"info","info",1017141280));var path = new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(info);var client = lt.objs.clients.client_BANG_.call(null,new cljs.core.Keyword(null,"julia.client","julia.client",3830708594));lt.plugins.julia.check_all.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"path","path",1017337751),path,new cljs.core.Keyword(null,"client","client",3951159101),client], null));
return client;
});

lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.plugins.julia","julia-lang","lt.plugins.julia/julia-lang",3761852442),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"julia.lang","julia.lang",1405919445),null], null), null));

lt.plugins.julia.julia = lt.object.create.call(null,new cljs.core.Keyword("lt.plugins.julia","julia-lang","lt.plugins.julia/julia-lang",3761852442));

lt.plugins.julia.__BEH__connect = (function __BEH__connect(this$,path){return lt.plugins.julia.try_connect.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"info","info",1017141280),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"path","path",1017337751),path], null)], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.julia","connect","lt.plugins.julia/connect",3202118946),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.julia.__BEH__connect,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"connect","connect",1965255772),null], null), null));

lt.objs.sidebar.clients.add_connector.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1017277949),"Julia",new cljs.core.Keyword(null,"desc","desc",1016984067),"Select a directory to serve as the root of your julia project",new cljs.core.Keyword(null,"connect","connect",1965255772),(function (){return lt.objs.dialogs.dir.call(null,lt.plugins.julia.julia,new cljs.core.Keyword(null,"connect","connect",1965255772));
})], null));

lt.plugins.julia.__BEH__julia_exe = (function __BEH__julia_exe(this$,exe){return lt.object.merge_BANG_.call(null,lt.plugins.julia.julia,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"julia-exe","julia-exe",610872080),exe], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.julia","julia-exe","lt.plugins.julia/julia-exe",799157726),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.julia.__BEH__julia_exe,new cljs.core.Keyword(null,"desc","desc",1016984067),"Julia: set the path to julia for clients",new cljs.core.Keyword(null,"params","params",4313443576),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"path",new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"path","path",1017337751)], null)], null),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",773332388),null], null), null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"user","user",1017503549),new cljs.core.Keyword(null,"exclusive","exclusive",2700522000),true);

}

//# sourceMappingURL=