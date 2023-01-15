import { challenges } from "@/data";
import React, { FunctionComponent } from "react";

const ButtonSegment: FunctionComponent<{
  challengeIndex: number;
  canProceed: boolean;
  submitCode: Function;
  runCode: Function;
  goToNext: Function;
}> = ({ submitCode, canProceed, runCode, goToNext, challengeIndex }) => {
  return canProceed ? (
    <div className="grid grid-cols-3 gap-3 mt-5">
      <button onClick={() => runCode()} className="col-span-2">
        <div className="py-3 text-xs text-white rounded-lg bg-darkYellow font-pressstart hover:bg-gray-300 hover:text-black">
          RUN
        </div>
      </button>
      <button onClick={() => goToNext(true)} className="col-span-1">
        <div className="py-3 text-xs text-white rounded-lg bg-darkYellow font-pressstart hover:bg-gray-300 hover:text-black">
          {challengeIndex == challenges.length - 1 ? `FIN` : `CONTINUE`}
        </div>
      </button>
    </div>
  ) : (
    <div className="grid grid-cols-3 gap-3 mt-5">
      <button onClick={() => runCode()} className="col-span-2">
        <div className="py-3 text-xs text-white rounded-lg bg-darkYellow font-pressstart hover:bg-gray-300 hover:text-black">
          RUN
        </div>
      </button>

      <button onClick={() => submitCode()} className="col-span-1">
        <div className="py-3 text-xs bg-white rounded-lg font-pressstart text-darkRed hover:bg-red-700 hover:text-white">
          SUBMIT
        </div>
      </button>
    </div>
  );
};

export default ButtonSegment;
