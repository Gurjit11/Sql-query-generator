"use client";
import Code from "@/components/Code";
import ListMessage from "@/components/ListMessage";
import Image from "next/image";
import { useState } from "react";
import ReactPlayer from "react-player";
// import SQLvisualizer from "@/components/SQLvisualizer";

interface ChatData {
  role: string;
  content: string;
}

export default function Home() {
  const [chat, setChat] = useState<ChatData[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getQuery = async () => {
    try {
      setLoading(true);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: query,
        }),
      };

      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL || "",
        options
      );
      const data = await response.json();
      console.log(data);
      const userMessage = {
        role: "user",
        content: query,
      };
      setChat((prev) => [...prev, data[0].message, userMessage]);
      setLoading(false);
    } catch (error) {
      console.log(error?.toString());
      setLoading(false);
    }
  };
  console.log(chat);

  const clearChat = () => {
    setQuery("");
    setChat([]);
  };

  const userMessages = chat.filter((message) => message.role === "user");
  const aiMessage = chat
    .filter((message) => message.role === "assistant")
    .pop();

  return (
    <main className="flex lg:px-80 flex-col items-center justify-center sm:p-24 py-24 px-5">
      <div className="z-50 w-full  items-center justify-between font-mono text-sm ">
        <p className="fixed left-0 items-center top-0 flex w-full justify-between px-10 border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-3 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit  ">
          <code className="font-mono text-xl font-bold">SQL Generator</code>
        </p>
        <div className="sm:fixed hidden bottom-0 left-0 sm:flex h-20 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black ">
          <span
            className="pointer-events-none flex place-items-center gap-2 p-4 "
            rel="noopener noreferrer"
          >
            By <span className="font-semibold text-xl">Gurjit Singh</span>
          </span>
        </div>
      </div>

      <div className=" group flex-col text-3xl sm:py-40 font-bold flex place-items-center before:absolute sm:before:h-[300px] sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 sm:after:h-[180px] sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <div>Generate SQL queries using AI</div>
        <div className="animate-bounce pt-8">
          <div className="inline-block   rotate-90 transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </div>
        </div>
      </div>
      <div className="z-10 hidden bg-black w-screen overflow-clip sm:text-2xl text-xl font-extrabold h-[110px] sm:flex flex-col justify-center items-center ">
        Create Queries in a single Click<br></br>
        <span className="text-sm font-extralight mt-2">
          See the demo video below
        </span>
      </div>
      <div className="absolute sm:top-[550px] top-[-500px] overflow-clip flex justify-center w-screen z-5">
        <ReactPlayer
          width="530px"
          height="600px"
          url="https://res.cloudinary.com/dtzaypqns/video/upload/v1690962342/video/yajhkeho0iip9iol9gu7.mp4"
          playing
          playbackRate={2}
          loop
          muted
        />
      </div>
      <div className="pt-[400px] sm:block hidden"></div>
      <div className="w-screen sm:w-full px-3 sm:bg-transparent bg-black z-10">
        <ListMessage userMessages={userMessages} />
      </div>

      <div className="py-3 pt-8 lg:px-32 w-full">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your Query..."
          className="text-white w-full p-2 bg-transparent  border-b-2 outline-none border-gray-400"
        />
      </div>
      <Code output={aiMessage?.content || ""} loading={loading} />

      <div className="mb-32 mt-10 flex gap-3">
        <div
          className="group  rounded-lg border border-transparent px-6 pt-2 bg-gradient-to-br from-blue-950 to-purple-950 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2
            onClick={getQuery}
            className={`mb-3 cursor-pointer sm:text-xl font-semibold`}
          >
            Get Query{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          {/* <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p> */}
        </div>
        <div
          className="group  rounded-lg border border-transparent px-6 pt-2 bg-gradient-to-br from-blue-950 to-purple-950 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2
            onClick={clearChat}
            className={`mb-3 cursor-pointer sm:text-xl font-semibold`}
          >
            Clear Chat{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          {/* <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p> */}
        </div>
      </div>
      {/* <SQLvisualizer /> */}
    </main>
  );
}
