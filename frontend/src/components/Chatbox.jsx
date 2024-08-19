import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Chatbox(props) {

  const data = props.data;
  const id = data['member'];
  const [user, setUser] = useState({});

  const nevigate = useNavigate();


  useEffect(()=> {
    async function getUser (){
      const res = await axios.get(`https://chatapplication-1-lliu.onrender.com/getSingleUser/${id}`);
      setUser(res.data);
    }

    getUser();

  },[id]);

  return (
    <section className="chat-box" onClick={()=> nevigate(`/message/${id}/${user['username']}`)}>
        <img className='inline-block h-10' src="/avatar.png" alt=""  />
        <h1 className='inline-block'>{user['username']}</h1>
    </section>
  )
}
