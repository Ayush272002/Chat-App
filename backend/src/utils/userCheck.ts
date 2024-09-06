import { WebSocket } from "ws";

export const users: {
  [ket: string]: {
    ws: WebSocket;
    rooms: string[];
  };
} = {};

export function oneUserSubscribedTo(roomId: string) {
  let totalInterestedPeople = 0;
  Object.keys(users).map((userId) => {
    if (users[userId].rooms.includes(roomId)) {
      totalInterestedPeople++;
    }
  });

  if (totalInterestedPeople === 1) {
    return true;
  }

  return false;
}

export function lastPersonLeftRoom(roomId: string) {
  let totalInterestedPeople = 0;
  Object.keys(users).map((userId) => {
    if (users[userId].rooms.includes(roomId)) {
      totalInterestedPeople++;
    }
  });

  if (totalInterestedPeople === 0) {
    return true;
  }

  return false;
}
