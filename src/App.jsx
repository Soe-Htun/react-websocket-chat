import { useState, useEffect, useRef } from 'react';
import { useWebSocket } from './hooks/useWebSocket';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import ConnectionStatus from './components/ConnectionStatus';

// Use local WebSocket server for real chat functionality
const WS_URL = 'ws://localhost:8080';

function App() {
  const [username, setUsername] = useState('');
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const { isConnected, messages, sendMessage } = useWebSocket(WS_URL);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSetUsername = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setIsUsernameSet(true);
    }
  };

  const handleSendMessage = (text) => {
    const message = {
      user: username,
      text,
      timestamp: new Date().toISOString(),
    };
    sendMessage(message);
  };

  if (!isUsernameSet) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-messenger-gray p-0 w-screen overflow-hidden">
        <div className="w-full max-w-sm px-5">
          <div className="bg-white rounded-xl p-8 shadow-lg text-center border border-messenger-border">
            <h1 className="text-2xl text-messenger-text mb-2 font-semibold">Welcome to WebSocket Chat</h1>
            <p className="text-messenger-secondary mb-6 text-sm">Enter your username to start chatting</p>
            <form onSubmit={handleSetUsername} className="flex flex-col gap-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="px-4 py-3 border border-gray-300 rounded-md text-sm outline-none transition-all bg-gray-50 text-messenger-text focus:border-messenger-blue focus:bg-white focus:shadow-sm focus:shadow-messenger-blue/20"
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-3 bg-messenger-blue text-white border-none rounded-md text-sm font-semibold cursor-pointer transition-all hover:bg-messenger-blue-hover hover:-translate-y-0.5"
              >
                Join Chat
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-messenger-gray p-0 w-screen overflow-hidden md:p-6">
      <div className="w-full max-w-md h-screen bg-white rounded-none shadow-none flex flex-col overflow-hidden relative border-l border-r border-messenger-border md:h-[700px] md:rounded-xl md:shadow-2xl md:border">
        <div className="flex justify-between items-center px-5 py-4 bg-white text-messenger-text border-b border-messenger-border z-10 min-h-[60px] md:rounded-t-xl">
          <div>
            <h2 className="text-base font-semibold mb-0.5 text-messenger-text">WebSocket Chat</h2>
            <p className="text-xs text-messenger-secondary font-normal">Logged in as: {username}</p>
          </div>
          <ConnectionStatus isConnected={isConnected} />
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 bg-white relative scroll-smooth scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-600">
          {messages.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-full text-messenger-secondary text-center">
              <div className="text-5xl mb-4">💬</div>
              <p className="text-sm mb-2">No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message, index) => {
              const isOwn = message.user === username;
              const prevMessage = messages[index - 1];

              const showUser = !isOwn && (!prevMessage || prevMessage.user !== message.user);

              return (
                <ChatMessage
                  key={index}
                  message={message}
                  isOwn={isOwn}
                  showUser={showUser}
                />
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={!isConnected}
        />
      </div>
    </div>
  );
}

export default App;
