import React, { FunctionComponent } from "react";
import Image from "next/image";

const MerliCard: FunctionComponent<{ speech: string }> = ({ speech }) => {
  return (
    <div className="flex flex-col items-center outline outline-4 outline-offset-0 outline-greyOutline bg-white rounded-lg p-6 h-full">
      <h1 className="font-fredoka font-bold text-2xl text-darkRed mb-5">
        Prof Merli
      </h1>

      <Image src="/merliHappy.png" alt="merli" width={200} height={200} />

      <div className="flex text-center place-items-center justify-center relative">
        <Image
          src="/speechBubbleVert.png"
          alt="merli"
          width={300}
          height={200}
        />
        <h1 className="absolute p-6 mt-4 text-black font-pressstart text-xs">
          {speech}
        </h1>
      </div>
    </div>
  );
};

export default MerliCard;
