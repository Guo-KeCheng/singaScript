import React, { FunctionComponent } from "react";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";
import Image from "next/image";
import { challenges } from "@/data";

const ChallengeCard: FunctionComponent<{
  challenge: number;
  goToNext: Function;
  hasCompletedChallenge: boolean;
}> = ({ challenge, goToNext, hasCompletedChallenge }) => {
  return (
    <div className="p-6 bg-white rounded-lg outline outline-4 outline-offset-0 outline-greyOutline">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {hasCompletedChallenge && (
            <Image
              className="mr-2"
              src="/tick.png"
              alt="merli"
              width={20}
              height={20}
            />
          )}
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
            <BsArrowLeftSquareFill
              className={`h-7 w-7 fill-darkYellow  ${
                challenges[challenge - 1]
                  ? "fill-darkYellow hover:fill-gray-500"
                  : "fill-gray-200"
              }`}
            />
          </button>
          &nbsp;&nbsp;
          <button onClick={() => goToNext(true)}>
            <BsArrowRightSquareFill
              className={`h-7 w-7 fill-darkYellow  ${
                challenges[challenge + 1]
                  ? "fill-darkYellow hover:fill-gray-500"
                  : "fill-gray-200"
              }`}
            />
          </button>
        </div>
      </div>

      <p className="text-sm font-normal font-fredoka">
        {challenges[challenge].description}
      </p>
    </div>
  );
};

export default ChallengeCard;
