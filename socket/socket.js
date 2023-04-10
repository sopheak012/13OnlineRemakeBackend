const socketIO = require("socket.io");

function initializeSocket(io) {
  io.on("connection", (socket) => {
    console.log("A new user connected");

    // Listen for messages from the client
    socket.on("chat message", (message) => {
      console.log("Received message:", message);

      // Broadcast the message to all connected clients
      io.emit("chat message", message);
    });

    // Disconnect event
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
}

module.exports = initializeSocket;
