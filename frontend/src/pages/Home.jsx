import React, { useRef } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Sidebar from '../components/Sidebar';


export default function Home() {

  const welcomeText = useRef();
  const subtitleText = useRef();
  const mybutton = useRef();
  const banner = useRef();

  const navigate = useNavigate();

  const tl = gsap.timeline();


  useGSAP(()=> {
    tl.from(welcomeText.current, {
      y: -300,
      duration:0.5,
      opacity: 0
    })

    tl.from(subtitleText.current, {
      scale:0,
      duration:0.5,
      opacity: 0
    })

    tl.to(mybutton.current, {
      duration: 0.5,
      opacity: 1
    })

    tl.from(banner.current, {
      scale: 0,
      duration: 0.2
    })

  })

  const SlideOpen = () => {
    gsap.to("#slide", {
      duration: 0.5,
      x: "-10%",
      ease: "back.inOut(1.7)",
      transformOrigin: "right center",
      transition: "x 0.5s ease-in-out"
    });

    gsap.from("ul li", {
      duration: 0.5,
      opacity: 0,
      stagger: 0.1
    })
  };

  const SlideClose = () => {
    gsap.to("#slide", {
      duration: 0.5,
      x: "150%",
      ease: "back.inOut(1.7)",
      transformOrigin: "right center",
      transition: "x 0.5s ease-in-out"
    });
  };
  
  let islogged = localStorage.getItem("islogged");
  

  return (
    <div className=' no-scrollbar relative'>
      <Sidebar open ={SlideOpen} close={SlideClose} />
      <Navbar />
      <div className=" hero-section flex justify-evenly mt-[15%] md:m-5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded h-[80vh] ">
        <div className="section1 text-center">
          <h1 ref={welcomeText} className='mt-[20%] text-xl uppercase font-bold text-white mb-2'>Welcome to ChatApp</h1>
          <p ref={subtitleText} className='text-gray-100'>This is a simple chat application built with React, NodeJS, Express, Socket.IO, and MongoDB.</p>

          <button ref={mybutton} onClick={()=> {
            islogged ? navigate('/chats'): navigate('/login')
          } } className='opacity-0 bg-white text-sky-500 font-semibold px-4 py-1 mt-[5%] rounded-md hover:bg-blue-500 hover:text-white duration-200'>Get Start</button>
        </div>

        <img ref={banner} className='h-52 mt-10 hidden sm:block sm:mt-16 sm:h-[400px]' src="/email.png" alt="email"  />
      </div>
      
    </div>
  )
}
