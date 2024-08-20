import React, { useEffect, useRef, useState } from 'react';
import MessageBox from '../components/MessageBox';
import 'remixicon/fonts/remixicon.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import { socket } from '../socket';

export default function Message() {
  const param = useParams();
  const receiverId = param['id'];
  const ownId = localStorage.getItem('id');

  const [message, setMessage] = useState([]);
  const lastMessage = useRef(null);
  const messageDiv = useRef(null);

  const notification = ()=>{
      const audio = new Audio('/notification.mp3');
      audio.play();
  }

  const formik = useFormik({
    initialValues: {
      message: ''
    },
    onSubmit: async (values) => {
      const messageData = {
        senderId: ownId,
        receiverId: receiverId,
        message: values['message']
      };
  
      const res = await axios.post("https://chatapplication-1-lliu.onrender.com/send/message", messageData);
      notification();
  
      // Emit the message via socket
      socket.emit('sendMessage', messageData);
  
      // Update the sender's local state immediately
      setMessage((prevMessages) => [...prevMessages, res.data]);
      notification();
      formik.resetForm();
    }
  });
  

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`https://chatapplication-1-lliu.onrender.com/getMessagesById/${ownId}/${receiverId}`);
        setMessage(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();

    socket.on('newMessage', (newMessage) => {
      if (newMessage.senderId === receiverId || newMessage.senderId === ownId) {
        notification();
        setMessage((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    return () => {
      socket.off('newMessage');
    };
  }, [ownId, receiverId]);

  useEffect(() => {
    if (lastMessage.current) {
      lastMessage.current.scrollIntoView();
    }
  }, [message]);

  return (
    <div className='relative min-h-screen flex flex-col'>


      <div id='container' className='flex flex-col items-center flex-grow'>
        <section className='fixed top-0 w-full bg-gradient-to-r from-green-400 to-blue-500 flex gap-2 pl-2 py-1 drop-shadow-sm justify-center'>
          <img className='h-8' src="/avatar.png" alt="image" />
          <p className=' inline-block mt-1'>{param['name']}</p>
        </section>

        <section className='flex-grow w-full md:w-[700px] bg-slate-100 rounded-sm mt-12'>
          <div ref={messageDiv} className="message-container h-[calc(100vh-140px)] overflow-y-auto overflow-x-hidden no-scrollbar">
            {message.map((msg, i) => (
              <MessageBox key={i} type={`${msg['sender'] === ownId ? "own" : "other"}`} date={msg['createdAt']} msg={msg['message']} />
            ))}
            <div ref={lastMessage}></div>
          </div>
        </section>

        <form onSubmit={formik.handleSubmit} className='fixed bottom-0 w-full md:w-[700px] px-2 py-2 bg-white flex items-center justify-between'>
          <textarea 
            autoFocus 
            id='message' 
            name='message' 
            onChange={formik.handleChange} 
            value={formik.values.message} 
            type="text" 
            className='outline outline-1 outline-sky-400 px-4 w-full md:w-[650px] rounded-full no-scrollbar' 
            placeholder='Type your message...' 
          />
          <button type='submit' className='rotate-45'>
            <i className="ri-send-plane-fill text-blue-500 text-4xl ml-2 "></i>
          </button>
        </form>

        

      </div>
    </div>
  );
}
