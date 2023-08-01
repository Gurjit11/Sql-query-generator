import React from "react";
import Message from "./Message";

interface UserMessage {
  role: string;
  content: string;
}

interface MessagesProp {
  userMessages: UserMessage[];
}

const ListMessage = ({ userMessages }: MessagesProp) => {
  return (
    <div className="w-full z-10 bg-black border-[0.1px] mt-10 border-gray-900 p-3 rounded-lg lg:min-h-[200px] min-h-[100px]">
      <div className="ml-4 my-1">History</div>
      <div className="border-b-[1px] mx-2 border-gray-600"></div>
      <div className="max-h-[170px] overflow-auto">
        {userMessages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
    </div>
  );
};

export default ListMessage;
