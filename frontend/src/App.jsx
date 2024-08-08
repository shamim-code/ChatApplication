import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Chats from './pages/Chats'
import Message from './pages/Message'
import AddFriend from './pages/AddFriend'


export default function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/message/:id/:name" element={<Message />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/addfriend" element={<AddFriend />} />
      </Routes>
    </BrowserRouter>
  )
}
