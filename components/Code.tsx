import Image from "next/image";
import React, { useState } from "react";

interface CodeProp {
  output: string;
  loading: boolean;
}

const Code = ({ output, loading }: CodeProp) => {
  const [copied, setCopied] = useState<string>("");
  const handleCopy = () => {
    setCopied(output);
    navigator.clipboard.writeText(output);
    setTimeout(() => setCopied(""), 3000);
  };
  return (
    <div className="w-full bg-black border-[0.1px] mt-10 border-gray-500  rounded-lg lg:min-h-[200px] min-h-[100px]">
      <div className="flex rounded-lg justify-between bg-gray-900 pl-1">
        <span className="flex">
          <span className="w-3 h-3 my-3 ml-2 block rounded-full bg-red-600"></span>
          <span className="w-3 h-3 my-3 mx-2 block rounded-full bg-yellow-600"></span>
          <span className="w-3 h-3 my-3 block rounded-full bg-green-600">
            {" "}
          </span>
        </span>
        <span
          className="w-7 h-7 my-1 mr-4 bg-yello-500  hover:scale-110 text-white cursor-pointer block rounded-lg"
          onClick={handleCopy}
        >
          <Image
            src={
              copied != "" && copied === output
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="/"
            width={30}
            height={30}
          />
        </span>
      </div>
      <div className="border-b-[1px] mx-2 border-gray-600"></div>
      <div className="p-3">
        {loading ? <div>AI is thinking...</div> : null}
        <pre className="text-blue-300  overflow-auto">{output}</pre>
      </div>
    </div>
  );
};

export default Code;
