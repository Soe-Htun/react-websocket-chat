import React, { useState } from 'react';

const ChatInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form className="flex items-center gap-3 px-5 py-4 border-t border-messenger-border bg-white" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        disabled={disabled}
        className="flex-1 px-4 py-2 bg-gray-100 border border-gray-200 rounded-full text-sm outline-none text-messenger-text placeholder-messenger-secondary transition-all focus:bg-white focus:border-messenger-blue focus:shadow-sm focus:shadow-messenger-blue/20 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={disabled || !message.trim()}
        className="w-8 h-8 bg-messenger-blue text-white rounded-full flex items-center justify-center text-lg font-bold transition-all hover:bg-messenger-blue-hover hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        title="Send message"
      >
        ↗
      </button>
    </form>
  );
};

export default ChatInput;
