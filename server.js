var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function (socket) {
  // jika ada chat baru
  socket.on("newMessage", function (msg) {
    io.emit("newMessage", msg);
    console.log("Chat baru: " + msg);
  });

  // jika user disconnect
  socket.on("disconnect", function (msg) {
    console.log("User disconnected");
  });
});

http.listen(3000, function () {
  console.log("Listening on 3000...");
});
