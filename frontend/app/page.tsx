"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const navigateToChat = () => {
    router.push("/chat/chooseRoom");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
      <img
        src="/landing.jpeg"
        alt="Landing Background"
        className="absolute inset-0 object-cover w-full h-full opacity-30"
      />
      <main className="relative flex flex-col items-center text-center gap-6 p-8 max-w-2xl">
        <h1 className="text-5xl font-extrabold tracking-wide animate-fade-in-up">
          Welcome to <span className="text-gray-400">WebSocket Chat App</span>
        </h1>
        <p className="text-lg leading-relaxed text-gray-300 animate-fade-in-up delay-150 text-balance">
          Connect with others in real-time, join chat rooms, and send messages
          instantly using WebSockets. Enjoy seamless and sleek communication in
          a modern design.
        </p>
        <p className="text-lg leading-relaxed text-gray-300 animate-fade-in-up delay-300 text-balance">
          Ready to start chatting? Click the button below to join a chat room
          and get started!
        </p>
        <button
          onClick={navigateToChat}
          className="px-8 py-3 mt-8 bg-white text-black rounded-full font-semibold hover:bg-gray-200 hover:scale-105 transition-transform duration-300 animate-fade-in-up delay-450"
        >
          Join Chat Room
        </button>
      </main>
    </div>
  );
}
