function initializeSocket(io) {
  let gameList = [null];

  io.on("connection", (socket) => {
    console.log("A new user connected");

    // Disconnect event
    socket.on("disconnect", () => {
      console.log("A user disconnected");
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
