"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChooseRoom() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  const handleSubscribe = () => {
    if (roomId.trim() === "") return;
    router.push(`/chat/room/${roomId}`);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 sm:p-12 bg-gradient-to-b from-gray-800 to-gray-900">
      <img
        src="/background.png"
        alt="Landing Background"
        className="absolute inset-0 object-cover w-full h-full opacity-50 z-0"
      />
      <div className="relative z-10 flex flex-col items-center text-center gap-8 w-full max-w-lg p-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-md">
          Choose a Chat Room
        </h1>
        <div className="flex flex-col gap-4 w-full px-4 sm:px-8">
          <label
            htmlFor="roomId"
            className="text-lg font-medium text-white drop-shadow-sm"
          >
            Enter Room ID
          </label>
          <input
            id="roomId"
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all bg-gray-200/90 placeholder-gray-600 text-black"
            placeholder="Enter room ID"
          />
          <button
            onClick={handleSubscribe}
            className="w-full py-3 bg-gradient-to-r from-green-500 via-green-400 to-green-600 text-white rounded-full shadow-lg transform transition-transform hover:scale-105 hover:from-green-400 hover:via-green-300 hover:to-green-500 duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}
