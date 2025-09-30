import { WebSocketServer } from 'ws';

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

// Store connected clients
const clients = new Set();

wss.on('connection', (ws) => {
  console.log('New client connected');
  clients.add(ws);

  // Send welcome message
  ws.send(JSON.stringify({
    type: 'system',
    text: 'Welcome to the chat!',
    timestamp: new Date().toISOString()
  }));

  // Broadcast number of connected users
  broadcastUserCount();

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      console.log('Received:', message);

      // Broadcast message to all connected clients
      broadcast(message, ws);
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
    broadcastUserCount();
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

function broadcast(message, sender) {
  clients.forEach((client) => {
    if (client !== sender && client.readyState === 1) { // WebSocket.OPEN = 1
      client.send(JSON.stringify(message));
    }
  });
}

function broadcastUserCount() {
  const count = clients.size;
  const message = {
    type: 'userCount',
    count: count,
    timestamp: new Date().toISOString()
  };

  clients.forEach((client) => {
    if (client.readyState === 1) { // WebSocket.OPEN = 1
      client.send(JSON.stringify(message));
    }
  });
}

console.log(`WebSocket server is running on ws://localhost:${PORT}`);
