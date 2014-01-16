#using HttpServer
#using Websockets
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

#wsh = WebSocketHandler() do req, client
#    while true
#      msg = read(client)
#      write(client, msg)
#    end
#end

#print("Connected")
error("ERROR")
#server = Server(wsh)
#run(server, 8080)
