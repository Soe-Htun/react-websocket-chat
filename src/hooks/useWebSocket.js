import { useEffect, useState, useCallback } from 'react';
import websocketService from '../services/websocket';

export const useWebSocket = (url) => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Connect to WebSocket
    websocketService.connect(url).catch((err) => {
      setError(err.message);
    });

    // Subscribe to connection status
    const unsubscribeConnected = websocketService.subscribe('connected', (data) => {
      setIsConnected(data.connected);
    });

    // Subscribe to messages
    const unsubscribeMessage = websocketService.subscribe('message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // Subscribe to errors
    const unsubscribeError = websocketService.subscribe('error', (err) => {
      setError(err.message);
    });

    // Cleanup on unmount
    return () => {
      unsubscribeConnected();
      unsubscribeMessage();
      unsubscribeError();
      websocketService.disconnect();
    };
  }, [url]);

  const sendMessage = useCallback((message) => {
    // Add message to local state immediately
    setMessages((prev) => [...prev, message]);
    // Send to server for broadcasting to others
    websocketService.send(message);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    isConnected,
    messages,
    error,
    sendMessage,
    clearMessages,
  };
};
