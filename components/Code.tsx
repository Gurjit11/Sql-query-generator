import React from "react";

interface CodeProp {
  output: string;
  loading: boolean;
}

const Code = ({ output, loading }: CodeProp) => {
  const formattedStr = output.replace(/\n/g, "<br>");
  console.log(formattedStr);
  return (
    <div className="w-full bg-black border-[0.1px] mt-10 border-gray-500  rounded-lg lg:min-h-[200px] min-h-[100px]">
      <div className="flex rounded-lg bg-gray-900 pl-1">
        <span className="w-3 h-3 my-3 ml-2 block rounded-full bg-red-600"></span>
        <span className="w-3 h-3 my-3 mx-2 block rounded-full bg-yellow-600"></span>
        <span className="w-3 h-3 my-3 block rounded-full bg-green-600"> </span>
      </div>
      <div className="border-b-[1px] mx-2 border-gray-600"></div>
      <div className="p-3">
        {loading ? <div>Ai is thinking...</div> : null}
        <pre className="text-blue-300  overflow-auto">{output}</pre>
      </div>
    </div>
  );
};

export default Code;
