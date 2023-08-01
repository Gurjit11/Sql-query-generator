import React from "react";

interface Message {
  role: string;
  content: string;
}

interface MessageProp {
  message: Message;
}

const Message = ({ message }: MessageProp) => {
  return (
    <div className="flex rounded-md bg-gray-900 w-full my-1 p-1">
      <p className="ml-1">X</p>
      <p className="ml-3">{message.role}</p>
      <p className="ml-3">{message.content}</p>
    </div>
  );
};

export default Message;
