import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

const index = () => {
  return (
    <div className="flex flex-col justify-center h-[100vh] content-center items-center">
      <div className="m-6 ">
        <h1 className="text-5xl text-white font-pressstart">
          <span className="text-darkYellow">SG </span>STUDIO CODE
        </h1>
      </div>
      <div>
        <Link href={"/home"}>
          <button>
            <div className="px-16 py-3 mt-5 text-lg text-white rounded-lg bg-darkYellow font-pressstart hover:bg-gray-300 hover:text-black">
              PLAY
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default index;
