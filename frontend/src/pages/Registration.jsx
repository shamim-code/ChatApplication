import React from "react";
import Navbar from '../components/Navbar'
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { registrationAsync } from "../store/auth/authReducer";
import Sidebar from "../components/Sidebar";

export default function Registration() {

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues:{
      username: '',
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      dispatch(registrationAsync(values));
    }
  })


  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className=" h-screen w-screen overflow-hidden mt-10">
        <form onSubmit={formik.handleSubmit} className=" bg-sky-600 m-5 p-5 flex flex-col items-center gap-5 rounded-md">
          <div>
            <input
              className=" rounded-sm outline-none pl-1"
              type="text"
              id="username"
              name="username"
              placeholder="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              required
            />
          </div>

          <div>
            <input
              className=" rounded-sm outline-none pl-1"
              type="text"
              id="email"
              name="email"
              placeholder="email"
              onChange={formik.handleChange}
              value={formik.values.email}
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
              onChange={formik.handleChange}
              value={formik.values.password}
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
