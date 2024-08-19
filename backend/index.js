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
  origin: true, // allow requests from this origin only
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
    origin: true,
    credentials: true, // enable cookies
  }
});

io.on('connection', (socket) => {

  socket.on('join', (userId) => {
    socket.join(userId); 
  });

  socket.on('sendMessage', (message) => {
    const { senderId, receiverId } = message;

    io.to(receiverId).emit('newMessage', message);

    io.to(senderId).emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


app.get('/', (req, res) => {
  res.send('Server is runing');
});

app.get('/api', async(req, res) => {
  const data = {
      id: 1,
      name: 'Sample Data',
      description: 'This is an example of a GET request.'
  };
  await res.json(data);
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

