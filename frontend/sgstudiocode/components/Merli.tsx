import React, { FunctionComponent } from "react";
import Image from "next/image";

const Merli: FunctionComponent<{ emotion: string }> = ({ emotion }) => {
  var merli = (
    <Image src="/merliHappy.png" alt="merli" width={200} height={200} />
  );
  switch (emotion) {
    case "happy":
      break;
    case "confused":
      merli = (
        <Image src="/merliConfused.png" alt="merli" width={200} height={200} />
      );
      break;
    case "excited":
      merli = (
        <Image src="/merliExcited.png" alt="merli" width={200} height={200} />
      );
      break;
    case "love":
      merli = (
        <Image src="/merliLove.png" alt="merli" width={230} height={230} />
      );
      break;
  }
  return <div>{merli}</div>;
};

export default Merli;
