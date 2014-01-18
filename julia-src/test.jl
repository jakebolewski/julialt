

1 + 2

function test()
  "hello world"
end

#type Test
#  a :: Int
#  b :: Int
#end

Test() = Test(1, 2)

test()

testy() = begin
  x = 1
  y = 2
  return + y
end

begin
  x = 1
  y = 2
  print(x + y)
end

testy()

is_linenumber(ex::LineNumberNode) = true
is_linenumber(ex::Expr) = is(ex.head, :line)
is_linenumber(ex) = false

get_linenumber(ex::Expr) = ex.args[1]
get_linenumber(ex::LineNumberNode) = ex.line

is_linenumber(2)

function lineno(code::String)
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
