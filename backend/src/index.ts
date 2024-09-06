import { WebSocketServer, WebSocket } from "ws";
import dotenv from "dotenv";
import { RedisManager } from "./utils/RedisManager";
import {
  lastPersonLeftRoom,
  oneUserSubscribedTo,
  users,
} from "./utils/userCheck";

dotenv.config();

const PORT = process.env.PORT || 8080;

const wss = new WebSocketServer({ port: PORT as number });

// setInterval(() => {
//     console.log(users);
// }, 5000);

const randomId = () => Math.random().toString(36).substring(2, 15);

wss.on("connection", (ws) => {
  const id = randomId();
  users[id] = {
    ws: ws,
    rooms: [],
  };

  ws.on("message", (message) => {
    const userMessage = JSON.parse(message.toString());
    if (userMessage.type === "SUBSCRIBE") {
      users[id].rooms.push(userMessage.room);
      if (oneUserSubscribedTo(userMessage.room)) {
        console.log("subscribing on the pub sub to room " + userMessage.room);
        RedisManager.getInstance().subscribe(userMessage.room, (message) => {
          const parsedMessage = JSON.parse(message);
          Object.keys(users).forEach((userId) => {
            const { ws, rooms } = users[userId];
            if (rooms.includes(parsedMessage.roomId)) {
              ws.send(parsedMessage.message);
            }
          });
        });
      }
    }

    if (userMessage.type === "UNSUBSCRIBE") {
      users[id].rooms = users[id].rooms.filter(
        (room) => room !== userMessage.room
      );
      if (lastPersonLeftRoom(userMessage.room)) {
        console.log(
          "unsubscribing from the pub sub to room " + userMessage.room
        );
        RedisManager.getInstance().unsubscribe(userMessage.room);
      }
    }

    if (userMessage.type === "SEND_MESSAGE") {
      const msg = userMessage.message;
      const roomId = userMessage.roomId;

      // Object.keys(users).forEach((userId) => {
      //     const { ws, rooms } = users[userId];
      //     if (rooms.includes(roomId)) {
      //         ws.send(msg)
      //     }
      // })

      RedisManager.getInstance().publish(
        roomId,
        JSON.stringify({
          type: "SEND_MESSAGE",
          roomId: roomId,
          message: msg,
        })
      );
    }
  });
});
