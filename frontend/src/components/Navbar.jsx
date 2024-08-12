import React, { useRef, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import toast, { Toaster } from 'react-hot-toast';
import { SlideClose, SlideOpen } from "./Animation";

export default function Navbar(props) {

  const isLogged =  localStorage.getItem("id");
  const nevigate = useNavigate();
  const text = useRef();
  const tl = gsap.timeline();
  const [toggle , setToggle] = useState(false);

  const logout =()=> {
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    nevigate('/');
  }

  const notify = () => toast("LogOut success",{
    duration:2000,
    position: "top-center",
    style: {},
    icon: "",
    iconTheme: {
      primary: '#000',
      secondary: '#fff'
    },
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
  })


    useGSAP(()=> {
      tl.from(text.current, {
        y: -100,
        duration: 0.8,
      })

      tl.from("li", {
        x: 500,
        opacity:0,
        duration:0.3,
        stagger: 0.2,
      })
      
    },[])

   
    
    const makeToggle =()=> {
      setToggle(!toggle);
    }


    return (
        <div className="bg-blue-600 p-2 flex justify-between w-full fixed top-0">
            <h1 ref={text} className="text-white uppercase font-semibold ">SamChat</h1>

            <ul className="hidden md:flex gap-2">
               <li className="text-gray-300 hover:text-white hover:duration-200"><NavLink to='/'>Home</NavLink></li>
               <li onClick={()=> isLogged ? nevigate("/chats"):alert("Please Login First")} className="text-gray-300 hover:text-white hover:duration-200"><NavLink>Chats</NavLink></li>
               <li onClick={()=> isLogged ? nevigate("/addfriend"):alert("Please Login First")} className="text-gray-300 hover:text-white hover:duration-200"><NavLink>Add Friend</NavLink></li>
               <li onClick={()=> isLogged ? alert("You are already logged in.") : nevigate("/login")} className="text-gray-300 hover:text-white hover:duration-200"><NavLink>Login</NavLink></li>
               <li onClick={()=> isLogged ? alert("You are already logged in."):nevigate("/register")} className="text-gray-300 hover:text-white hover:duration-200"><NavLink>Registration</NavLink></li>
               {isLogged ? <li onClick={()=> logout()} className="text-gray-300 hover:text-white hover:duration-200 cursor-pointer">Logout</li>: ""}
            </ul>

            <div className=" md:hidden">
              
              {toggle ? <button onClick={()=> {SlideClose(), makeToggle()}}><i className="ri-close-large-fill text-white text-xl"></i></button> : <button onClick={()=> {SlideOpen(),makeToggle()}}><i className="ri-menu-3-line text-white text-xl"></i></button>}

            </div>
            <Toaster />
        </div>
    );
}
