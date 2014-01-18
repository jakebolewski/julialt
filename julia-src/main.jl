using JSON

const PORT = int(ARGS[1])
const CLID = int(ARGS[2])

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

function find_loc(args, line, nlines)
  for i in 1:lenth(args)
    if !isa(args[i], Expr)
      continue
    end
    if isa(first(args[i].args), LineNumberNode):
      # this expression is a block
      expr_start = args[i].args[1].line
      expr_end = (i + 1) > length(args) ? nlines : args[i+1].line
      if line >= expr_begin && line <= expr_end
        return {"start" => expr_start, "end" => expr_end}
      end
    else
      # this expression is a single line statement
      local line_before::Int
      local line_after::Int
      if i + 1 < length(args) && i - 1 > 0
        line_before = args[i-1].line
        line_after  = args[i+1].line
      end
      if i + 1 < length(args)
        line_before = args[i-1].line
        line_after  = nlines
      end
      if i - 1 > 0
        line_before = 1
        line_after = args[i+1].line
      end
      if line_before < line < line_after
        return {"start" => 1}
    end
end

function handle_pos(str, pos)
  lines = split(str, "\n")
  nlines = length(lines)
  if nlines == 0
    return (nothing, nothing)
  end
  expr = parseblock(str)
  loc = find_loc(expr.args, pos["line"] + 1, nlines)
  if loc != nothing
    return to_form(lines, loc)
  end
  return (nothing, nothing)
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

function send_response(socket, id, cmd, args)
  println("send response")
  data = json([id, cmd, args])
  write(socket, string(data, "\n"))
end

function eval_julia(socket, id, msg)
  try
    res = include_string(clean_code(msg["code"]))
    if res == nothing
        send_response(socket, id, "editor.eval.julia.success",
                      {"meta" => msg})
    else
        send_response(socket, id, "editor.eval.julia.result",
                      {"result"=>res, "meta"=> msg})
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
