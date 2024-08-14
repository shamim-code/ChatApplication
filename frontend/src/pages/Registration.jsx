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
{/* 
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
      </div> */}


      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
                    </h1>
                    <form class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">username</label>
                            <input type="text" name="text" id="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your name" required="" />
                        </div>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email</label>
                            <input type="email" name="email" id="email" placeholder="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                        <div>
                            <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                              <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                            </div>
                            <div class="ml-3 text-sm">
                              <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                            </div>
                        </div>
                        <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
