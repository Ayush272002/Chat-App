interface HeaderProps {
  roomId: string | string[];
  handleLeave: () => void;
}

const Header = ({ roomId, handleLeave }: HeaderProps) => {
  return (
    <header className="bg-gray-900 p-4 rounded-lg shadow-md flex items-center justify-between">
      <h1 className="text-xl font-semibold">Chat Room {roomId}</h1>
      <button
        onClick={handleLeave}
        className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-full shadow-lg hover:from-red-600 hover:to-red-700 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-400"
      >
        Leave Chat
      </button>
    </header>
  );
};

export default Header;
