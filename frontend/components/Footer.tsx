import { IoIosSend } from "react-icons/io";

interface FooterProps {
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: () => void;
}

export default function Footer({
  message,
  setMessage,
  handleSendMessage,
}: FooterProps) {
  return (
    <footer className="bg-gray-800 p-4 flex items-center gap-3 rounded-lg shadow-md">
      <input
        id="message"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border-none p-3 rounded-full flex-grow bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow shadow-inner"
        placeholder="Type your message..."
      />
      <button
        onClick={handleSendMessage}
        className="flex justify-center bg-indigo-600 p-3 rounded-full focus:outline-none hover:bg-indigo-700 active:bg-indigo-800 transition-all shadow-lg"
      >
        <IoIosSend className="text-2xl text-white" />
      </button>
    </footer>
  );
}
