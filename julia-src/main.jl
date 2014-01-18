using JSON

#-------------
# global state
#--------------
const PORT = int(ARGS[1])
const CLID = int(ARGS[2])

stopped::Bool = true

function response_msg()
  client_msg = json({"name" => "Julia $(basename(pwd()))",
                     "client-id" => CLID,
                     "dir" => pwd(),
                     "commands" => ["editor.eval.julia"],
                     "type" => "julia"})
  return string(client_msg, "\n")
end

function parseblock(code::String)
  codeblock = "begin;" * code * ";end"
  return parse(codeblock)
end

is_linenumber(ex::LineNumberNode) = true
is_linenumber(ex::Expr) = is(ex.head, :line)
is_linenumber(ex) = false

get_linenumber(ex::Expr) = ex.args[1]
get_linenumber(ex::LineNumberNode) = ex.line

function find_loc(code::String)
  nlines = length(split(str, "\n"))
  codeblock = "begin;" * code * ";end"
  expr = parse(codeblock)
  nargs = length(expr.args)
  res = {}
  return expr
  for (i, arg) in enumerate(expr.args)
    if isa(arg, LineNumberNode) || arg.head == :line
      continue
    end
    if is(arg.head, :function)
      b = get_linenumber(arg.args[end].args[1])
      e = i + 1 > nargs ? nlines : get_linenumber(expr.args[i + 1])
        push!(res, (arg, (b - 1, e)))
      continue
    elseif (is(arg.head, :(=)) ||
            is(arg.head, :->)) &&
            is(arg.args[end].head, :block)
      b = get_linenumber(arg.args[end].args[1])
      e = i + 1 > nargs ? nlines : get_linenumber(expr.args[i + 1])
      push!(res, (arg, (b, e)))
      continue
    elseif is(arg.head, :block) ||
           is(arg.head, :let)
       n = get_linenumber(arg.args[1])
       push!(res, (arg, n - 1))
    elseif is(arg.head, :type)
       n = get_linenumber(arg.args[end].args[1])
       push!(res, (arg, n - 1))
    else
      if i - 1 > 0 && i + 1 < length(expr.args)
        push!(res, (arg, expr.args[i+1].line - 2))
      elseif i + 1 > length(expr.args)
        push!(res, (arg, nlines - 2))
      else
        push!(res, (arg, expr.args[i-1].line + 1))
      end
    end
  end
  return res
end

function to_form(loc, line, nlines)
end

function handle_pos(code, pos)
  lines = split(code, "\n")
  nlines = length(lines)
  if nlines == 0
    return {(nothing, nothing)}
  end
  loc = find_loc(code, pos["line"] + 1, nlines)
  if !isempty(loc)
    return to_form(lines, loc, nlines)
  end
  return {(nothing, nothing)}
end

function parseall(str::String; greedy::Bool=true, raise=Bool=true)
  exprs = Array(Any, 0)
  i, len = 1, length(str)
  while i < len
    (ex, i) = parse(str, i, greedy=greedy, raise=raise)
    push!(exprs, ex)
  end
  return exprs
end

function parseblock(str::String)
  codeblock = "begin;" * code * ";end"
  expr = parse(codeblock)e
  for arg in expr.args
    if isa(arg, LineNumberNode)
      println(arg.line)
    end
  end
end

function clean_code(c)
  return replace(c, r"(#.*coding.*)\n?", "\n")
end

function clean_trace(t)
    return string(t)
end

function send_response(socket, id, cmd, args)
  data = json([id, cmd, args])
  write(socket, string(data, "\n"))
end

function handle_eval(data)
    result = nothing
    code = clean_code(msg["code"])
    if haskey(msg, "meta")
        loc = msg["meta"]
    else
        loc = {"start" => 1, "end" => 1}
    end
    to_exec = {}
    if haskey(msg, "pos")
        try
            push!(to_exec, handle_pos(code, msg["pos"]))
        catch err
           return send_response(socket, id, "editor.eval.julia.exception",
                                {"ex"   => clean_trace(err),
                                 "meta" => {"start" => msg["pos"]["line"],
                                            "end"   => msg["pos"]["line"]}})
        end
    else
        try
            exp = code
            if haskey(msg, "meta")
                exp = "\n"^msg["meta"]["start"] * code
            end
            to_exec = explode_code(exp)
        catch
            return send_response(socket, id, "editor.eval.julia.exception",
                                 {"ex" => clean_trace(err),
                                  "meta" => msg["meta"]})
        end
    end
    if code == nothing || len(to_exec) == 0
        return send_reponse(socket, id, "editor.eval.python.result", {})
    end

    for form in to_exec
        expr, loc = form
        if expr == nothing || loc == nothing
            continue
        end
        try
            res = eval(expr)
            if res != nothing
                send_response(socket, id, "editor.eval.julia.response",
                             {"result" => utf8(res), "meta" => loc})
            else
                send_response(socket, id, "editor.eval.julia.success",
                              {"meta" => loc})
        catch err
            try
                send_response(socket, id, "editor.eval.julia.exception",
                            {"ex" => clean_trace(err),
                            "meta" => loc})
                continue
            catch err
                println(err)
            end
        end
    end
end



function eval_julia(socket, id, msg)
  try
    res = include_string(clean_code(msg["code"]))
    if res == nothing
        send_response(socket, id, "editor.eval.julia.success",
          {"meta" => {"start" => 1, "end" => 1}})
    else
        send_response(socket, id, "editor.eval.julia.result",
        {"result" => string(res), "meta"=> {"start" => 1,
                                             "end" => 1}})
    end
  catch err
      err_msg = string(err) * "\n"
      send_response(socket, id, "editor.eval.julia.exception",
                    {"ex" => err_msg,
                     "meta" => {"start" => 1,
                                "end" => 1}})
  end
end

function close_connection(socket)
  close(socket)
  println("Disconnected")
  exit(0)
end

function recv_lighttable(sock)
  msg = JSON.parse(readline(sock))
  return msg
end

function eventloop(socket)
  try
    while true
      msg = recv_lighttable(socket)
      try
        if length(msg) != 3
          println("invalid input!")
          continue
        end
        cid, cmd, msg = msg
        if bool(cid) && length(cmd) > 0
          if cmd == "editor.eval.julia"
            eval_julia(socket, cid, msg)
          elseif cmd == "client.close"
            close_connection(socket)
          end
        else
          println("invalid input")
        end
      catch
        #TODO
      end
    end
  catch e
    if isa(e, InterruptException)
      eventloop(socket)
    else
      rethrow()
    end
  end
end

function waitloop()
  @async eventloop(sock)
  while true
    try
      wait()
    catch e
      rethrow()
    end
  end
end

sock = connect(ip"127.0.0.1", PORT)
write(sock, response_msg())
println("Connected")
waitloop()
