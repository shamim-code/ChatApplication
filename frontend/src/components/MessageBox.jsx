import React from 'react'

export default function MessageBox(props) {
  
  const messageType = props.type;
  const message = props.msg;

  console.log("This is from messageBox", message);

  return (
    <section className={messageType === 'own' ? 'msg-right' : 'msg-left'}>
    <img className="h-10 w-10 rounded-full" src='/avatar.png' alt="avatar" />
    <div>
      <div id="msg" className="inline-block bg-[#3572EF] p-2 rounded-sm mt-1 text-white text-sm min-h-12 min-w-16 max-w-[40%] break-words whitespace-pre-wrap">
        {message}
      </div>
      <p className="text-xs font-normal text-gray-500">1 hour ago</p>
    </div>
  </section>

  )
}
