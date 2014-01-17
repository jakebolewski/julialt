#using HttpServer
#using WebSockets
using JSON

type LTConnection
  name::String
  connection_type::String
  id::Int
  dir::String
  commands::Vector{String}
end

#error("Error args length: $(length(ARGS)), $(ARGS[1]), $(ARGS[2])")

const PORT = int(ARGS[1])
const CLID = int(ARGS[2])

function response_msg(msg)
  client_msg = json({"name" => "julia-lt",
                     "client-id" => CLID,
                     "dir" => pwd(),
                     "commands" => ["editor.eval.julia"],
                     "type" => "julia"})
  return client_msg
end

@async begin
server = listen(PORT)
sock = accept(server)
println("Connected")
in = readline(sock)
open("log.txt", "a+") do fh
  write(fh, in)
end
write(sock, response_msg(in))
close(sock)
end

#wsh = WebSocketHandler() do req, client
#  while true
#    msg = read(client)
#    rsp = response_msg(msg)
#    write(client, rsp)
#  end
#end

#server = Server(wsh)
#run(server, PORT)
