import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FriendBox from "../components/FriendBox";
import axios from 'axios';
import Sidebar from './../components/Sidebar';

export default function AddFriend() {

  const [othersPeople, setOthersPeople] = useState([]);
  const id = localStorage.getItem('id');

    useEffect(()=> {
        const fetchData = async() => {
          try {
            const res = await axios.get(`https://chatapplication-1-lliu.onrender.com/getOthersPeople/${id}`);
            console.log("This is add friend",res.data);
            setOthersPeople(res.data);
          } catch (error) {
            console.log(error);
          }
        }

        fetchData();
    },[id])

    console.log(othersPeople);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="people-list">
        <h1 className=" text-center uppercase font-semibold text-white underline">
          People are connected in this platfrom
        </h1>
        <div>
          {
            othersPeople.map((person) => (
              <FriendBox key={person._id} person={person} />
            ))
          }
        </div>
      </div>
    </div>
  );
}
