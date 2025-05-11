const express = require('express');
const app= express();
const http = require("http");
const path = require('path');

const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.set(express.static(path.join(__dirname,"public")));

io.on("connection",function(socket){
    socket.on("send-location", function (data){
        io.emit("receive-location",{id: socket.id, ...data})
    });

    socket.on("disconnect", function(){
        io.emit("user-disconect",socket.id)
    })
});

app.get("/",function(req,res){
    res.render("index");
})

app.get("/", function(req,res){
    res.send("hey");
});

server.listen(3000);
