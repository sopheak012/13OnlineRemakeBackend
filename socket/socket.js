function initializeSocket(io) {
  let gameList = [null];

  io.on("connection", (socket) => {
    console.log("A new user connected");

    //listen for startGame
    socket.on("start-game", (lobbyName) => {
      io.to(lobbyName).emit("start-game");
    });

    // Join a room
    socket.on("join-room", (lobbyName) => {
      socket.join(lobbyName);
      console.log(`Socket ${socket.id} joined room ${lobbyName}`);
    });

    // Leave a room
    socket.on("leave-room", (lobbyName) => {
      socket.leave(lobbyName);
      console.log(`Socket ${socket.id} left room ${lobbyName}`);
    });

    //Handle Message
    socket.on("send-message", (lobbyName, message) => {
      console.log(`Message received for room ${lobbyName}: ${message.message}`);
      io.to(lobbyName).emit("receive-message", message);
    });

    // Disconnect event
    socket.on("disconnect", () => {
      console.log(
        `A user with socket ID ${
          socket.id
        } disconnected from rooms: ${Array.from(socket.rooms).join(", ")}`
      );
    });

    //update state from clients
    socket.on("lobby-update", (update) => {
      console.log("state updated");
      gameList = update;
      io.emit("update", gameList);
    });

    //send a ca llback to any socket that needs an update
    socket.on("get-update", (callback) => {
      console.log("update state to client");
      callback(gameList);
    });
  });
}

module.exports = initializeSocket;
