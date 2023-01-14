import react, { useRef, useState } from "react";

import { challenges } from "@/data";
import ChallengeCard from "@/components/ChallengeCard";

import MerliCard from "@/components/MerliCard";

const Index = () => {
  const [activeChallenge, setActiveChallenge] = useState(0);

  const [validChallenges, setValidChallenges] = useState(
    // Array(challenges.length).fill(true)
    [true, true, true, true, false, false, false, false]
  );

  let goToNext: (toAdvance: boolean) => void = function (
    toAdvance: boolean
  ): void {
    console.log(validChallenges[activeChallenge + 1]);
    if (toAdvance && validChallenges[activeChallenge] === true) {
      if (activeChallenge + 1 < challenges.length) {
        setActiveChallenge(activeChallenge + 1);
      }
    } else if (!toAdvance && activeChallenge - 1 > -1) {
      setActiveChallenge(activeChallenge - 1);
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-center m-6">
        <h1 className="text-3xl text-white font-pressstart">
          <span className="text-darkYellow">SG </span>STUDIO CODE
        </h1>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <ChallengeCard challenge={activeChallenge} goToNext={goToNext} />
        </div>

        <div className="col-span-4">
          <div className="h-[75vh]">
            <MerliCard speech={"hello"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
