const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const socket = require("socket.io");
const messageRoutes = require("./routes/messages");
const usersRoutes = require("./routes/users");
const http = require("http");
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb+srv://root:root@delivair.1zg97hn.mongodb.net/delivair", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/messages", messageRoutes);
app.use("/api/users", usersRoutes);

server.listen(3000, () => console.log("server started on 3000"));

const io = socket(server, {
  cors: {
    origin: "http://127.0.0.1:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  //sends the message to all the users on the server
  socket.on("message", (data) => {
    io.emit("messageResponse", data);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

// socket.on("disconnect", () => {
//   socket.disconnect();
//   console.log("🔥: A user disconnected");
// });
