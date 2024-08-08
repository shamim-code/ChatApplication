import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import FriendBox from "../components/FriendBox";

export default function AddFriend() {

    useEffect(()=> {

    })

  return (
    <div>
      <Navbar />

      <div className="people-list">
        <h1 className=" text-center uppercase font-semibold text-white underline">
          People are connected in this platfrom
        </h1>
        <div>
          <FriendBox />
        </div>
      </div>
    </div>
  );
}
