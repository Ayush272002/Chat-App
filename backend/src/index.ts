import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

const users: {
    [ket: string]: {
        ws: WebSocket,
        rooms: string[]
    }
} = {
    
}

setInterval(() => { 
    console.log(users);
}, 5000);

const randomId = () => Math.random().toString(36).substring(2, 15);

wss.on("connection", (ws) => {
    const id = randomId();
    users[id] = {
        ws: ws,
        rooms: []
    }

    ws.on("message", (message) => { 
        const userMessage = JSON.parse(message.toString());
        if (userMessage.type === "SUBSCRIBE") {
            users[id].rooms.push(userMessage.room);
        }

        if (userMessage.type === "SEND_MESSAGE") {
            const msg = userMessage.message;
            const roomId = userMessage.roomId;

            Object.keys(users).forEach((userId) => {
                const { ws, rooms } = users[userId];
                if (rooms.includes(roomId)) {
                    ws.send(msg)
                }
            })
        }
    })
})