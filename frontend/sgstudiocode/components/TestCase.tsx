import React, { FunctionComponent } from "react";
import Image from "next/image";

const TestCase: FunctionComponent<{
  func: string;
  userResult: string | number | boolean;
  expectedResult: string | number | boolean;
}> = ({ func, userResult, expectedResult }) => {
  return (
    <div className="flex items-center justify-around h-16 p-3 mt-3 text-sm bg-white rounded-lg base font-fredoka">
      <p className="text-darkRed">{func}</p>
      <p>Result: {userResult}</p>
      <p>Expected: {expectedResult}</p>
      {userResult === expectedResult && (
        <Image src="/tick.png" alt="merli" width={20} height={20} />
      )}
      {userResult !== expectedResult && (
        <Image src="/cross.png" alt="merli" width={20} height={20} />
      )}
    </div>
  );
};

export default TestCase;
