"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { SignalingManager } from "@/utils/SignalingManager";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ChatRoom() {
  const router = useRouter();
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
    const payload = JSON.stringify({
      type: "SUBSCRIBE",
      room: roomId,
    });
    const signalingManager = SignalingManager.getInstance();
    signalingManager.sendMessage(payload);

    signalingManager.setOnMessageCallback((newMessage: string) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    scrollToBottom();
    return () => {
      leave();
    };
  }, [roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const leave = () => {
    const unsubscribePayload = JSON.stringify({
      type: "UNSUBSCRIBE",
      room: roomId,
    });
    SignalingManager.getInstance().sendMessage(unsubscribePayload);
  };

  const handleLeave = () => {
    leave();
    router.push("/");
  };

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

  return (
    <div className="flex flex-col justify-between h-screen w-screen p-4 bg-gradient-to-b from-black to-gray-900 text-white">
      <Header roomId={roomId} handleLeave={handleLeave} />

      <main className="flex-1 overflow-y-auto p-4 bg-gray-900 border-t border-gray-800 rounded-lg shadow-inner">
        <ul className="flex flex-col gap-4">
          {messages.length > 0 ? (
            messages.map((msg, index) => {
              const isMine = myMessages.includes(msg);
              return (
                <li
                  key={index}
                  className={`p-3 max-w-[75%] rounded-3xl shadow-md transition-transform transform ${
                    isMine
                      ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-700 self-end text-white hover:scale-105"
                      : "bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 self-start text-gray-200 hover:scale-105"
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

      <Footer
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}
