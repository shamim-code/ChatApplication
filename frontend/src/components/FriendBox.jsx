import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function FriendBox(props) {

  const [user , setUser] = useState({});

  const nevigate = useNavigate();

  const person = props.person;
  const id = person['_id'];
  const userId = localStorage.getItem('id');


  useEffect(()=>{
    const fetchData =async()=> {
      const res = await axios.get(`https://chatapplication-1-lliu.onrender.com/getSingleUser/${id}`);
      setUser(res.data);
    }

    fetchData();

  }, [id]);

  
  const addFriend =async()=>{
    const res = await axios.post(`https://chatapplication-1-lliu.onrender.com/conversation/create/${userId}/${id}`);
  }

  return (
    <section className="friend-box box-border" >
        <div>
            <img className='inline-block h-10' src="/avatar.png" alt=""  />
            <h1 className='inline-block'>{user['username']}</h1>
        </div>
        <button className='bg-blue-600 m-2 px-4 rounded-sm text-white' onClick={()=> {addFriend(), nevigate("/chats")}}>Add</button>
    </section>
  )
}
