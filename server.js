const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const http = require("http");
const socketIO = require("socket.io");
const initializeSocket = require("./socket/socket");

const PORT = process.env.PORT || 4000;
const DB_URI = process.env.DB_URI;

//connect to mongo database
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to MongoDB");

    // create a socket connection
    const httpServer = http.createServer(app);
    const io = socketIO(httpServer, {
      cors: {
        origin: "https://one3frontend.onrender.com",
        methods: ["GET", "POST"],
      },
    });
    initializeSocket(io); // pass the io object to the initializeSocket function

    // start the server only after the connection is successful
    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

connectDB();

app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);
