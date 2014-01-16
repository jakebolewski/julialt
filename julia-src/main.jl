using HttpServer
using WebSockets
#import IJulia

type LTConnection
  name::String
  connection_type::String
  id::Int
  dir::String
  commands::Vector{String}
end

type LTPayload
  data::Dict
end

function handle_msg(msg)
  println(msg)
end

print("Connected")

wsh = WebSocketHandler() do req, client
    while true
        msg = read(client)
        #write(client, msg)
        handle_msg(msg)
    end
end

server = Server(wsh)
run(server, 8080)


println("test")
