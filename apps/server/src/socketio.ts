import { Socket } from "socket.io";
import { TypeIO } from ".";
import { User } from "./models/user";
import { SocketEvents } from "@shared/index"
console.log(SocketEvents);



const authorizedDB = {

} as {
    [key: string]: {
        id: string;
        username: string
    };
}

export function socketio(io: TypeIO) {
  
    io.on("connection", (socket: Socket) => {
        console.log('SOCKET CONNECTED', socket.id);

        socket.emit("connected", {
            message: "Successfully connected to server",
            status: 1
        })


        socket.on(SocketEvents.LOGIN, async (auth: {
            username: string;
            password: string;
        }) => {
            const { username, password } = auth;
            console.log("LOGIN", username==process.env._USERNAME, username, process.env._USERNAME, password==process.env._PASSWORD);
            if(username == process.env._USERNAME && password == process.env._PASSWORD) {
                authorizedDB[socket.id] = {
                    id: socket.id,
                    username: username
                };
                socket.emit(SocketEvents.ON_LOGIN, { message: "Successfully logged in", status: 1 });
            }else {
                socket.emit(SocketEvents.ON_LOGIN, { message: "Invalid credentials", status: 0 });
            }
        });
        
        socket.on("connect", ()=> {
            console.log("connected")
        })


        socket.on("getUser", () => {
            socket.emit("user", authorizedDB[socket.id]);
        });
        socket.on("disconnect", () => {
            socket.disconnect();
        });
    })

}