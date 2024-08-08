import React from 'react'

export default function FriendBox() {
  return (
    <section className="friend-box box-border" >
        <div>
            <img className='inline-block h-10' src="/avatar.png" alt=""  />
            <h1 className='inline-block'>Name</h1>
        </div>
        <button className='bg-blue-600 m-2 px-4 rounded-sm text-white'>Add</button>
    </section>
  )
}
