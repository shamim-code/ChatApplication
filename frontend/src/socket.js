import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:2000';

export const socket = io(URL);

socket.on('connect', () => {
  const userId = localStorage.getItem('id');
  socket.emit('join', userId); // Join the room with the user's ID
});
