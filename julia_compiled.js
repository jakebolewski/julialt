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
var out = data.toString();cljs.core.prn.call(null,out);
lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"buffer","buffer",3930752946)], null),cljs.core.str,out);
if((out.indexOf("Connected") > -1))
{lt.objs.notifos.done_working.call(null,"Connected");
return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"connected","connected",4729661051),true], null));
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.julia","on-out","lt.plugins.julia/on-out",1410778016),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.julia.__BEH__on_out,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"proc.out","proc.out",4302083112),null], null), null));

lt.plugins.julia.__BEH__on_error = (function __BEH__on_error(this$,data){cljs.core.prn.call(null,"on-error");
var out = data.toString();cljs.core.prn.call(null,"on-error: ",data);
if((new cljs.core.Keyword(null,"buffer","buffer",3930752946).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)).indexOf("Connected") > -1))
{return null;
} else
{return lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"buffer","buffer",3930752946)], null),cljs.core.str,out);
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.julia","on-error","lt.plugins.julia/on-error",3750071698),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.julia.__BEH__on_error,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"proc.error","proc.error",4143512802),null], null), null));

lt.plugins.julia.__BEH__on_exit = (function __BEH__on_exit(this$,data){cljs.core.prn.call(null,"on-exit: ",data," connected: ",new cljs.core.Keyword(null,"connected","connected",4729661051).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
if(cljs.core.truth_(new cljs.core.Keyword(null,"connected","connected",4729661051).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))))
{} else
{lt.objs.notifos.done_working.call(null,"Error!");
lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",4087600639),"Error connecting to Julia",new cljs.core.Keyword(null,"body","body",1016933652),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1017440956),"There was an issue connnecting to IJulia.\n                                                     Here's what we got:",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre","pre",1014015509),new cljs.core.Keyword(null,"buffer","buffer",3930752946).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))], null)], null),new cljs.core.Keyword(null,"buttons","buttons",1255256819),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1116631654),"close"], null)], null)], null));
lt.objs.clients.rem_BANG_.call(null,new cljs.core.Keyword(null,"client","client",3951159101).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
}
lt.objs.proc.kill_all.call(null,new cljs.core.Keyword(null,"procs","procs",1120844623).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
return lt.object.destroy_BANG_.call(null,this$);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.julia","on-exit","lt.plugins.julia/on-exit",1230650692),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.julia.__BEH__on_exit,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"proc.exit","proc.exit",4162906152),null], null), null));

lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.plugins.julia","connecting-notifier","lt.plugins.julia/connecting-notifier",3823085841),new cljs.core.Keyword(null,"triggers","triggers",2516997421),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"behaviors","behaviors",607554515),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.plugins.julia","on-out","lt.plugins.julia/on-out",1410778016),new cljs.core.Keyword("lt.plugins.julia","on-error","lt.plugins.julia/on-error",3750071698),new cljs.core.Keyword("lt.plugins.julia","on-exit","lt.plugins.julia/on-exit",1230650692)], null),new cljs.core.Keyword(null,"init","init",1017141378),(function (this$,client){lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"client","client",3951159101),client,new cljs.core.Keyword(null,"buffer","buffer",3930752946),""], null));
return null;
}));

lt.plugins.julia.escape_spaces = (function escape_spaces(s){if(cljs.core._EQ_.call(null,lt.objs.files.separator,"\\"))
{return [cljs.core.str("\""),cljs.core.str(s),cljs.core.str("\"")].join('');
} else
{return s;
}
});

lt.plugins.julia.run_julia = (function run_julia(p__8201){var map__8203 = p__8201;var map__8203__$1 = ((cljs.core.seq_QMARK_.call(null,map__8203))?cljs.core.apply.call(null,cljs.core.hash_map,map__8203):map__8203);var info = map__8203__$1;var env = cljs.core.get.call(null,map__8203__$1,new cljs.core.Keyword(null,"env","env",1014004831));var client = cljs.core.get.call(null,map__8203__$1,new cljs.core.Keyword(null,"client","client",3951159101));var name = cljs.core.get.call(null,map__8203__$1,new cljs.core.Keyword(null,"name","name",1017277949));var project_path = cljs.core.get.call(null,map__8203__$1,new cljs.core.Keyword(null,"project-path","project-path",1907176907));var path = cljs.core.get.call(null,map__8203__$1,new cljs.core.Keyword(null,"path","path",1017337751));var n = lt.objs.notifos.working.call(null,"Connecting...");var obj = lt.object.create.call(null,new cljs.core.Keyword("lt.plugins.julia","connecting-notifier","lt.plugins.julia/connecting-notifier",3823085841),client);var env__$1 = cljs.core.PersistentArrayMap.EMPTY;return lt.objs.proc.exec.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"command","command",1964298941),(function (){var or__6741__auto__ = new cljs.core.Keyword(null,"julia-exe","julia-exe",610872080).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.julia.julia));if(cljs.core.truth_(or__6741__auto__))
{return or__6741__auto__;
} else
{return "julia";
}
})(),new cljs.core.Keyword(null,"args","args",1016906831),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.plugins.julia.escape_spaces.call(null,lt.plugins.julia.julia_path),lt.objs.clients.tcp.port,lt.objs.clients.__GT_id.call(null,client)], null),new cljs.core.Keyword(null,"cwd","cwd",1014003170),project_path,new cljs.core.Keyword(null,"env","env",1014004831),env__$1,new cljs.core.Keyword(null,"obj","obj",1014014057),obj], null));
});

lt.plugins.julia.find_project = (function find_project(obj){var p = new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(obj);var roots = lt.objs.files.get_roots.call(null);var cur = p;var prev = "";while(true){
cljs.core.prn.call(null,roots,cur,prev);
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

lt.plugins.julia.find_project2 = (function find_project2(obj){var p = new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(obj);return cljs.core.assoc.call(null,obj,new cljs.core.Keyword(null,"project-path","project-path",1907176907),lt.objs.files.parent.call(null,p));
});

lt.plugins.julia.notify = (function notify(obj){var map__8205 = obj;var map__8205__$1 = ((cljs.core.seq_QMARK_.call(null,map__8205))?cljs.core.apply.call(null,cljs.core.hash_map,map__8205):map__8205);var client = cljs.core.get.call(null,map__8205__$1,new cljs.core.Keyword(null,"client","client",3951159101));var julia_client = cljs.core.get.call(null,map__8205__$1,new cljs.core.Keyword(null,"julia-client","julia-client",2943204913));var project_path = cljs.core.get.call(null,map__8205__$1,new cljs.core.Keyword(null,"project-path","project-path",1907176907));var julia = cljs.core.get.call(null,map__8205__$1,new cljs.core.Keyword(null,"julia","julia",1115390155));if((cljs.core.not.call(null,julia)) || (cljs.core.empty_QMARK_.call(null,julia)))
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

lt.plugins.julia.check_all = (function check_all(obj){return lt.plugins.julia.notify.call(null,lt.plugins.julia.find_project2.call(null,lt.plugins.julia.check_client.call(null,lt.plugins.julia.check_julia.call(null,obj))));
});

lt.plugins.julia.try_connect = (function try_connect(p__8206){var map__8208 = p__8206;var map__8208__$1 = ((cljs.core.seq_QMARK_.call(null,map__8208))?cljs.core.apply.call(null,cljs.core.hash_map,map__8208):map__8208);var info = cljs.core.get.call(null,map__8208__$1,new cljs.core.Keyword(null,"info","info",1017141280));cljs.core.prn.call(null,"try-connect: ws - ",lt.objs.clients.tcp.port);
var path = new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(info);var client = lt.objs.clients.client_BANG_.call(null,new cljs.core.Keyword(null,"julia.client","julia.client",3830708594));lt.plugins.julia.check_all.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"path","path",1017337751),path,new cljs.core.Keyword(null,"client","client",3951159101),client], null));
return client;
});

lt.plugins.julia.julia_watch = (function julia_watch(meta,src){var meta__$1 = JSON.stringify(cljs.core.clj__GT_js.call(null,meta));return [cljs.core.str(src)].join('');
});

lt.plugins.julia.__BEH__julia_result = (function __BEH__julia_result(editor,res){cljs.core.prn.call(null,"julia-result");
lt.objs.notifos.done_working.call(null);
return lt.object.raise.call(null,editor,new cljs.core.Keyword(null,"editor.result","editor.result",4030217008),new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"end","end",1014004813).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res)),new cljs.core.Keyword(null,"start-line","start-line",3689311729),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res))], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.julia","julia-result","lt.plugins.julia/julia-result",1801672463),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.julia.__BEH__julia_result,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.julia.result","editor.eval.julia.result",2625062805),null], null), null));

lt.plugins.julia.__BEH__julia_success = (function __BEH__julia_success(editor,res){lt.objs.notifos.done_working.call(null);
return lt.object.raise.call(null,editor,new cljs.core.Keyword(null,"editor.result","editor.result",4030217008),"\u2713",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"end","end",1014004813).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res)),new cljs.core.Keyword(null,"start-line","start-line",3689311729),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res))], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.julia","julia-success","lt.plugins.julia/julia-success",2907446925),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.julia.__BEH__julia_success,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.julia.success","editor.eval.julia.success",750463023),null], null), null));

lt.plugins.julia.__BEH__julia_exception = (function __BEH__julia_exception(editor,ex){lt.objs.notifos.done_working.call(null);
return lt.object.raise.call(null,editor,new cljs.core.Keyword(null,"editor.exception","editor.exception",3983021184),new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(ex),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"end","end",1014004813).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(ex))], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.julia","julia-exception","lt.plugins.julia/julia-exception",4519477457),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.julia.__BEH__julia_exception,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.julia.exception","editor.eval.julia.exception",1785426427),null], null), null));

lt.plugins.julia.__BEH__julia_printer = (function __BEH__julia_printer(editor,p){return lt.objs.console.loc_log.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"file","file",1017047278),lt.objs.files.basename.call(null,new cljs.core.Keyword(null,"file","file",1017047278).cljs$core$IFn$_invoke$arity$1(p)),new cljs.core.Keyword(null,"line","line",1017226086),"stdout",new cljs.core.Keyword(null,"content","content",1965434859),new cljs.core.Keyword(null,"msg","msg",1014012659).cljs$core$IFn$_invoke$arity$1(p)], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.julia","julia-printer","lt.plugins.julia/julia-printer",1892918758),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.julia.__BEH__julia_printer,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.julia.print","editor.eval.julia.print",925860185),null], null), null));

lt.plugins.julia.__BEH__on_eval = (function __BEH__on_eval(editor){cljs.core.prn.call(null,"on-eval");
return lt.object.raise.call(null,lt.plugins.julia.julia,new cljs.core.Keyword(null,"eval!","eval!",1110791799),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"origin","origin",4300251800),editor,new cljs.core.Keyword(null,"info","info",1017141280),cljs.core.assoc.call(null,cljs.core.deref.call(null,editor).call(null,new cljs.core.Keyword(null,"info","info",1017141280)),new cljs.core.Keyword(null,"code","code",1016963423),lt.plugins.watches.watched_range.call(null,editor,null,null,lt.plugins.julia.julia_watch))], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.julia","on-eval","lt.plugins.julia/on-eval",1230654914),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.julia.__BEH__on_eval,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eval","eval",1017029646),null], null), null));

lt.plugins.julia.__BEH__on_eval__DOT__one = (function __BEH__on_eval__DOT__one(editor){cljs.core.prn.call(null,"on-eval.one");
var code = lt.plugins.watches.watched_range.call(null,editor,null,null,lt.plugins.julia.julia_watch);var pos = lt.objs.editor.__GT_cursor.call(null,editor);var info = new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor));var info__$1 = (cljs.core.truth_(lt.objs.editor.selection_QMARK_.call(null,editor))?cljs.core.assoc.call(null,info,new cljs.core.Keyword(null,"code","code",1016963423),lt.objs.editor.selection.call(null,editor),new cljs.core.Keyword(null,"meta","meta",1017252215),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"start","start",1123661780),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,editor,"start")),new cljs.core.Keyword(null,"end","end",1014004813),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,editor,"end"))], null)):cljs.core.assoc.call(null,info,new cljs.core.Keyword(null,"pos","pos",1014015430),pos,new cljs.core.Keyword(null,"code","code",1016963423),code));cljs.core.prn.call(null,new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(info__$1));
return lt.object.raise.call(null,lt.plugins.julia.julia,new cljs.core.Keyword(null,"eval!","eval!",1110791799),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"origin","origin",4300251800),editor,new cljs.core.Keyword(null,"info","info",1017141280),info__$1], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.julia","on-eval.one","lt.plugins.julia/on-eval.one",2001482554),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.julia.__BEH__on_eval__DOT__one,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eval.one","eval.one",1173589382),null], null), null));

lt.plugins.julia.__BEH__eval_BANG_ = (function __BEH__eval_BANG_(this$,event){cljs.core.prn.call(null,"eval!");
var map__8210 = event;var map__8210__$1 = ((cljs.core.seq_QMARK_.call(null,map__8210))?cljs.core.apply.call(null,cljs.core.hash_map,map__8210):map__8210);var origin = cljs.core.get.call(null,map__8210__$1,new cljs.core.Keyword(null,"origin","origin",4300251800));var info = cljs.core.get.call(null,map__8210__$1,new cljs.core.Keyword(null,"info","info",1017141280));var client = new cljs.core.Keyword(null,"default","default",2558708147).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"client","client",3951159101).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,origin)));lt.objs.notifos.working.call(null,"");
return lt.objs.clients.send.call(null,lt.objs.eval.get_client_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"editor.eval.julia","editor.eval.julia",3010658330),new cljs.core.Keyword(null,"origin","origin",4300251800),origin,new cljs.core.Keyword(null,"info","info",1017141280),info,new cljs.core.Keyword(null,"create","create",3956577390),lt.plugins.julia.try_connect], null)),new cljs.core.Keyword(null,"editor.eval.julia","editor.eval.julia",3010658330),info,new cljs.core.Keyword(null,"only","only",1017320222),origin);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.julia","eval!","lt.plugins.julia/eval!",4593679099),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.julia.__BEH__eval_BANG_,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eval!","eval!",1110791799),null], null), null));

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