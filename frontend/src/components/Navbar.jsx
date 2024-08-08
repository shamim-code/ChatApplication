import React, { useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useSelector } from 'react-redux'

export default function Navbar() {

  const isLogged = useSelector((state)=> state.auth.isAuthenticated) ;

  const nevigate = useNavigate();

  const text = useRef();

  const tl = gsap.timeline();

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

    return (
        <div className="bg-blue-600 p-2 flex justify-between w-full fixed top-0">
            <h1 ref={text} className="text-white uppercase font-semibold ">SamChat</h1>

            <ul className="flex gap-2">
               <li className="text-gray-300 hover:text-white hover:duration-200"><NavLink to='/'>Home</NavLink></li>
               <li onClick={()=> isLogged ? nevigate("/chats"):alert("Please Login First")} className="text-gray-300 hover:text-white hover:duration-200"><NavLink>Chats</NavLink></li>
               <li onClick={()=> isLogged ? nevigate("/addfriend"):alert("Please Login First")} className="text-gray-300 hover:text-white hover:duration-200"><NavLink>Add Friend</NavLink></li>
               <li className="text-gray-300 hover:text-white hover:duration-200"><NavLink to='/login'>Login</NavLink></li>
               <li className="text-gray-300 hover:text-white hover:duration-200"><NavLink to='/register'>Register</NavLink></li>
               {isLogged ? <li className="text-gray-300 hover:text-white hover:duration-200 cursor-pointer">Logout</li>: ""}
            </ul>

        </div>
    );
}
