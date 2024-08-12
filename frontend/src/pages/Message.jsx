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
  const [newMessage, setNewMessage] = useState({});
  const messageDiv = useRef(null);


  const formik = useFormik({
    initialValues: {
      message: ''
    },
    onSubmit: async (values) => {
      const res = await axios.post("http://localhost:2000/send/message", {
        senderId: ownId,
        receiverId: receiverId,
        message: values['message']
      });
      setNewMessage(values['message']);
      formik.resetForm();
    }
  });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/getMessagesById/${ownId}/${receiverId}`);
        setMessage(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();

    // Listen for 'newMessage' event from the server
    socket.on('newMessage', (newMessage) => {
      if (newMessage.senderId === receiverId || newMessage.senderId === ownId) {
        setMessage((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    // Cleanup the event listener on component unmount
    return () => {
      socket.off('newMessage');
    };
  }, [ownId, receiverId, message]);


  // Scroll into view when the message list updates
  useEffect(() => {
    if (lastMessage.current) {
      lastMessage.current.scrollIntoView(); // Immediate scroll for new messages
    }
  }, [message]);
  



  return (
    <div>
      <h1 className=' bg-blue-500 z-20 text-white text-center text-xl py-1 drop-shadow-md'>Message</h1>

      <div id='container' className='w-screen flex flex-col items-center'>
        <section className='fixed top-8 w-full bg-gray-200 flex gap-2 pl-2 py-1 drop-shadow-sm justify-center'>
          <img className='h-8' src="/avatar.png" alt="image" />
          <p className=' inline-block mt-1'>{param['name']}</p>
        </section>

        <section className=' w-[700px] bg-slate-100 rounded-sm '>
          <div ref={messageDiv} className="message-container mt-11 h-[81vh] overflow-y-auto overflow-x-hidden no-scrollbar">
            {message.map((msg, i) => (
              <MessageBox key={i} type={`${msg['sender'] === ownId ? "own" : "other"}`} date={msg['createdAt']} msg={msg['message']} />
            ))}
            <div className='mt-1' ref={lastMessage}></div> {/* This will scroll into view */}
          </div>

          <form onSubmit={formik.handleSubmit} className=' mx-1 mb-1 fixed bottom-0 w-full'>
            <div className=' relative'>
              <textarea autoFocus id='message' name='message' onChange={formik.handleChange} value={formik.values.message} type="text" className=' outline outline-1 outline-sky-400 px-1 w-[650px] rounded-sm ' />
              <button type='submit'><i className="ri-send-plane-fill text-blue-500 text-4xl ml-2 absolute top-2 "></i></button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
