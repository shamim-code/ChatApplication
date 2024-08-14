import React from 'react'
import moment from"moment";

export default function MessageBox(props) {
  
  const messageType = props.type;
  const message = props.msg;
  const date = props.date;

  return (
    <section className={messageType === 'own' ? 'msg-right' : 'msg-left'}>
    <img className="h-10 w-10 rounded-full" src='/avatar.png' alt="avatar" />
    <div>
    <p
      id="msg"
       className={messageType === 'own'? 'inline-block bg-gradient-to-r from-purple-600 to-indigo-600 px-2 py-1 rounded-xl mt-1 text-white text-sm break-words max-w-[300px]': "inline-block bg-gradient-to-r from-teal-500 to-emerald-500 px-2 py-1 rounded-xl mt-1 text-white text-sm break-words max-w-[300px]"}
    >
      {message}
    </p>

      <p className="text-xs font-normal text-gray-500">{moment(date).fromNow()}</p>
    </div>
  </section>

  )
}
