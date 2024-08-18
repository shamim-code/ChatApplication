"use strict";

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authRuter = require('./Routes/authRoute');
const conversationRoute = require('./Routes/conversationRoute');
const {Server} = require('socket.io');


app.use(cors({
  origin: 'http://localhost:5173', // allow requests from this origin only
  credentials: true, // enable cookies
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(authRuter);
app.use(conversationRoute);

const server = http.createServer(app);

const io = new Server(server,{
  cors:{
    origin: 'http://localhost:5173',
    credentials: true, // enable cookies
  }
});

io.on('connection', (socket) => {

  // Assume that the user will send their ID after connection
  socket.on('join', (userId) => {
    socket.join(userId); // Join a room with the user ID
  });

  socket.on('sendMessage', (message) => {
    const { senderId, receiverId } = message;

    // Emit the message to the receiver's room
    io.to(receiverId).emit('newMessage', message);

    // Optionally emit back to the sender if you want to update their view too
    io.to(senderId).emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});


//mongodb://localhost:27017/

const connection =()=> {
    mongoose.connect('mongodb+srv://shamim:12345@cluster0.yf9lf.mongodb.net/chatapp')
   .then(()=> console.log('MongoDB Connected...'))
   .catch(err => console.log(err));
}


server.listen(2000, () => {
  connection();
  console.log('listening on *:2000');
});

