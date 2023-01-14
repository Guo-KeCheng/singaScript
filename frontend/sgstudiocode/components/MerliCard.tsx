import React, { FunctionComponent } from "react";
import Image from "next/image";
import Merli from "./Merli";

const MerliCard: FunctionComponent<{
  speech: string;
  emotion: string;
  hasSubmittedChallenge: boolean;
}> = ({ speech, emotion, hasSubmittedChallenge }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg outline outline-4 outline-offset-0 outline-greyOutline">
      <h1 className="mb-5 text-2xl font-bold font-fredoka text-darkRed">
        Prof Merli
      </h1>

      {hasSubmittedChallenge ? (
        <div className="flex flex-row justify-center place-items-center">
          <Merli emotion={emotion} />

          <div className="relative flex content-center justify-center text-center place-items-center">
            <Image
              src="/speechBubbleHor.png"
              alt="merli"
              width={300}
              height={200}
            />
            <h1 className="ml-8 absolute p-6 text-[10px] text-black font-pressstart">
              {speech}
            </h1>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center place-items-center">
          <Merli emotion={emotion} />

          <div className="relative flex justify-center text-center place-items-center">
            <Image
              src="/speechBubbleVert.png"
              alt="merli"
              width={300}
              height={200}
            />
            <h1 className="absolute p-6 mt-4 text-xs text-black font-pressstart">
              {speech}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default MerliCard;
