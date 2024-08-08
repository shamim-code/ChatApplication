import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import 'remixicon/fonts/remixicon.css'
import Chatbox from '../components/Chatbox'
import axios from 'axios'

export default function Chats() {

  const userId = localStorage.getItem('id')
  const [conversations, setConversations] = useState([]);
  
  async function getConversations (){
    const res = await axios.get(`https://chatapplication-1-lliu.onrender.com/getAllConversationsById/${userId}`);
    setConversations(res.data);
  }

  useEffect(()=> {
    getConversations();
  },[]);

  return (
    <div>
       <Navbar />

       <section className="chat-list">
          
          {
            conversations.map((conversation ,key) => <Chatbox key={key} data = {conversation} />)
          }
          
       </section>
       
    </div>
  )
}
