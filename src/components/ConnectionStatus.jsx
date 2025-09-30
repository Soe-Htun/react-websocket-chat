import React from 'react';

const ConnectionStatus = ({ isConnected }) => {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
      <span className="text-xs text-messenger-secondary font-medium">
        {isConnected ? 'Connected' : 'Disconnected'}
      </span>
    </div>
  );
};

export default ConnectionStatus;
