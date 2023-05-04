function initializeSocket(io) {
  let gameList = [null];
  let cardGame = null;

  io.on("connection", (socket) => {
    console.log("A new user connected");

    socket.on("start-game", (lobbyName) => {
      console.log('Server received "start-game" event for lobby:', lobbyName);

      // Perform any necessary validation
      io.to(lobbyName).emit("start-game");
      console.log('Server emitted "start-game" event to lobby:', lobbyName);
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

    //deleted a socket room
    socket.on("delete-room", (lobbyName) => {
      io.to(lobbyName).emit("delete-room");
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

    //cardGame

    //send a callback to player
    socket.on("initial-cardGame", (callback) => {
      callback(cardGame);
    });

    //update card game state
    socket.on("cardGame-update", (data) => {
      const { lobbyName, cardGameState } = data;
      cardGame = cardGameState;
      io.to(lobbyName).emit("cardGame-update", cardGame);
    });
  });
}

module.exports = initializeSocket;
