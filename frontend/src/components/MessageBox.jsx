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
       className="inline-block bg-[#3572EF] p-2 rounded-sm mt-1 text-white text-sm break-words max-w-[300px]"
    >
      {message}
    </p>

      <p className="text-xs font-normal text-gray-500">{moment(date).fromNow()}</p>
    </div>
  </section>

  )
}
