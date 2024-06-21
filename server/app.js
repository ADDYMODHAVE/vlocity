// server/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const pollRoutes = require("./routes/pollRoutes");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/polls", pollRoutes);

io.on("connection", (socket) => {
  console.log("New connection:", socket.id);

  socket.on("vote", (data) => {
    io.emit("voteUpdate", data);
  });

  socket.on("comment", (data) => {
    io.emit("commentUpdate", data);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
