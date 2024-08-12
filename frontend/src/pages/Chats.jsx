import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Chatbox from '../components/Chatbox'
import axios from 'axios'

export default function Chats() {

  const userId = localStorage.getItem('id')
  const [conversations, setConversations] = useState([]);
  
  async function getConversations (){
    const res = await axios.get(`http://localhost:2000/getAllConversationsById/${userId}`);
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
