import { Server, Socket } from "socket.io";

const io = new Server(3003);

io.on("connection", (socket) => {
  socket.emit("hello world");
  socket.on("message", (data) => {
    console.log("Message from client:", data);

    // Broadcast to everyone (including sender)
    io.emit("message", data);
  });
});
