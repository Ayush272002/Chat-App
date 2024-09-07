"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { SignalingManager } from "@/utils/SignalingManager";
import { IoIosSend } from "react-icons/io";

export default function ChatRoom() {
  const { roomId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [myMessages, setMyMessages] = useState<string[]>([]);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    console.log(roomId);

    // Subscribe to the room
    const payload = JSON.stringify({
      type: "SUBSCRIBE",
      room: roomId,
    });
    const signalingManager = SignalingManager.getInstance();
    signalingManager.sendMessage(payload);

    // Set up the message handler
    signalingManager.setOnMessageCallback((newMessage: string) => {
      console.log("New message received:", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    scrollToBottom();

    // Cleanup on unmount
    return () => {
      const unsubscribePayload = JSON.stringify({
        type: "UNSUBSCRIBE",
        room: roomId,
      });
      signalingManager.sendMessage(unsubscribePayload);
    };
  }, [roomId]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    const payload = JSON.stringify({
      type: "SEND_MESSAGE",
      roomId,
      message,
    });
    const signalingManager = SignalingManager.getInstance();
    signalingManager.sendMessage(payload);
    setMyMessages([...myMessages, message]);
    setMessage("");
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col justify-between h-screen w-screen p-4 bg-gradient-to-b from-black to-gray-800 text-white">
      <header className="bg-gray-900 p-4 rounded-lg shadow-md">
        <h1 className="text-xl font-semibold">Chat Room {roomId}</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 bg-black border-t border-gray-700 rounded-lg shadow-inner">
        <ul className="flex flex-col gap-4">
          {messages.length > 0 ? (
            messages.map((msg, index) => {
              const isMine = myMessages.includes(msg);
              return (
                <li
                  key={index}
                  className={`p-3 max-w-[75%] rounded-xl shadow-md transition-transform transform ${
                    isMine
                      ? "bg-gray-700 self-end text-white hover:scale-105"
                      : "bg-gray-600 self-start text-gray-200 hover:scale-105"
                  }`}
                >
                  {msg}
                </li>
              );
            })
          ) : (
            <p className="text-gray-400 text-center">No messages yet</p>
          )}
          <div ref={messageEndRef} />
        </ul>
      </main>

      <footer className="bg-gray-900 p-4 flex items-center gap-3 rounded-lg shadow-md">
        <input
          id="message"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border-none p-3 rounded-md flex-grow bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white transition-shadow shadow-inner"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="flex justify-center bg-blue-600 p-3 rounded-full focus:outline-none hover:bg-blue-700 active:bg-blue-800 transition-all shadow-lg"
        >
          <IoIosSend className="text-2xl text-white flex justify-center" />
        </button>
      </footer>
    </div>
  );
}
