import { useState } from 'react';

const ChatMessage = ({ message, isOwn, showUser = false }) => {
  const { user, text, timestamp } = message;
  const [showTimestamp, setShowTimestamp] = useState(false);

  // Don't render if message text is empty or null
  if (!text || text.trim() === '') {
    return null;
  }

  return (
    <div className="mb-3 animate-slideIn">
      {!isOwn && showUser && (
        <div className="text-[12px] text-messenger-secondary mb-1 ml-1 font-medium">{user}</div>
      )}
      <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`
            max-w-xs lg:max-w-md px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-sm cursor-pointer
            ${isOwn
              ? 'bg-gradient-to-br from-messenger-blue to-blue-600 text-white rounded-br-md'
              : 'bg-gray-100 text-messenger-text rounded-bl-md'
            }
          `}
          onClick={() => setShowTimestamp(!showTimestamp)}
        >
          <div className={isOwn ? 'text-white' : 'text-messenger-text'}>{text}</div>
        </div>
      </div>
      {showTimestamp && (
        <div className={`text-[11px] text-messenger-secondary mt-1 ${isOwn ? 'text-right mr-1' : 'text-left ml-1'}`}>
          {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
