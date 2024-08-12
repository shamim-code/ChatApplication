import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { loginAsync } from "../store/auth/authReducer";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export default function Login() {

  const notify = () => toast("Login success",{
    duration:2000,
    position: "top-center",
    style: {},
    icon: "👏",
    iconTheme: {
      primary: '#000',
      secondary: '#fff'
    },
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isLoggedIn) {
      notify();
      setTimeout(() => navigate('/chats'), 2000);
    }
  }, [isLoggedIn, navigate]);

  const TheFormik = useFormik({
    initialValues: {
       email: '',
       password: '',
    }, 
    onSubmit: (values) => {
      dispatch(loginAsync(values));
    }
  })

  return (
    <div>
      <Navbar />
      <Toaster />

      <div className=" h-screen w-screen overflow-hidden">
        <form onSubmit={TheFormik.handleSubmit} className=" bg-sky-600 m-12 p-5 flex flex-col items-center gap-5 rounded-md">
          <div>
            <input
              className=" rounded-sm outline-none pl-1"
              type="email"
              id="email"
              name="email"
              onChange={TheFormik.handleChange}
              value={TheFormik.values.email}
              placeholder="email"
              required
            />
          </div>
          <div>
            <input
              className=" rounded-sm outline-none pl-1"
              type="password"
              id="password"
              name="password"
              placeholder="password"
              onChange={TheFormik.handleChange}
              value={TheFormik.values.password}
              required
            />
          </div>
          <div>
            <button
              className=" bg-white text-sky-500 font-semibold px-4 py-1 mt-[5%] rounded-md hover:bg-blue-500 hover:text-white duration-200"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
