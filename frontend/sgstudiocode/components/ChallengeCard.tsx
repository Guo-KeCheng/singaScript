import React, { FunctionComponent } from "react";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";
import Image from "next/image";
import { challenges } from "@/data";

const ChallengeCard: FunctionComponent<{
  challenge: number;
  goToNext: Function;
}> = ({ challenge, goToNext }) => {
  return (
    <div className="p-6 bg-white rounded-lg  outline outline-4 outline-offset-0 outline-greyOutline">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold font-fredoka text-darkYellow">
            Challenge {challenge + 1}
          </h1>
          <Image
            src="/sg.png"
            alt="singapore flag"
            width={40}
            height={40}
            className="w-8 h-8 ml-3"
          />
        </div>
        <div>
          <button onClick={() => goToNext(false)}>
            <BsArrowLeftSquareFill className="h-7 w-7 fill-darkYellow hover:fill-yellow-300 " />
          </button>
          &nbsp;&nbsp;
          <button onClick={() => goToNext(true)}>
            <BsArrowRightSquareFill className="h-7 w-7 fill-darkYellow hover:fill-yellow-300" />
          </button>
        </div>
      </div>

      <p className="text-sm font-normal font-fredoka">
        {challenges[challenge]}
      </p>
    </div>
  );
};

export default ChallengeCard;
