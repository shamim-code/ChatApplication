import React, { useEffect } from 'react';
import gsap from 'gsap';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Sidebar() {

  const isLogged = localStorage.getItem("id");
  const navigate = useNavigate();
  const tl = gsap.timeline();

  const logout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    navigate('/');
  }



  return (
    <div id='slide' className='absolute top-0 z-20 right-0 translate-x-[150%] w-[50%] p-3 h-[500px] bg-gradient-to-r from-violet-600 to-indigo-600'>
      <ul className="md:hidden">
        <li className="text-gray-300 hover:text-white hover:duration-200"><NavLink to='/'>Home</NavLink></li>
        <li onClick={() => isLogged ? navigate("/chats") : alert("Please Login First")} className="text-gray-300 hover:text-white hover:duration-200"><NavLink>Chats</NavLink></li>
        <li onClick={() => isLogged ? navigate("/addfriend") : alert("Please Login First")} className="text-gray-300 hover:text-white hover:duration-200"><NavLink>Add Friend</NavLink></li>
        <li onClick={() => isLogged ? alert("You are already logged in.") : navigate("/login")} className="text-gray-300 hover:text-white hover:duration-200"><NavLink>Login</NavLink></li>
        <li onClick={() => isLogged ? alert("You are already logged in.") : navigate("/register")} className="text-gray-300 hover:text-white hover:duration-200"><NavLink>Registration</NavLink></li>
        {isLogged ? <li onClick={() => logout()} className="text-gray-300 hover:text-white hover:duration-200 cursor-pointer">Logout</li> : ""}
      </ul>
    </div>
  );
}
