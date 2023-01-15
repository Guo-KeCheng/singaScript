import React, { FunctionComponent } from "react";
import Image from "next/image";
import Merli from "./Merli";
import { MdHelpCenter } from "react-icons/md";
import { FaWindowClose } from "react-icons/fa";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { CodeBlock, dracula } from "react-code-blocks";

const MerliCard: FunctionComponent<{
  speech: string;
  emotion: string;
  hasSubmittedChallenge: boolean;
}> = ({ speech, emotion, hasSubmittedChallenge }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg outline outline-4 outline-offset-0 outline-greyOutline">
      <div className="flex flex-row mb-5 align-middle place-items-center">
        <h1 className="text-2xl font-bold font-fredoka text-darkRed">
          Prof Merli
        </h1>

        <motion.button onClick={openModal} whileHover={{ scale: 1.1 }}>
          <MdHelpCenter className="w-8 h-auto ml-2 fill-darkRed"></MdHelpCenter>
        </motion.button>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div className="relative h-full pt-20 bg-white rounded-md">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="absolute right-5 top-5"
            onClick={closeModal}
          >
            <FaWindowClose className="w-8 h-auto fill-darkYellow">
              {" "}
            </FaWindowClose>
          </motion.button>

          <h1 className="text-2xl font-bold text-center font-fredoka text-darkRed">
            Welcome to singaScript! Here is how singaScript compares with
            JavaScript!
          </h1>

          <div className="px-32 py-16">
            <CodeBlock
              theme={dracula}
              text={`const table = 1;\nconst benches = 2;\n(table != benches);\nconst your_grades = 5;\nconst my_grades = 10;\n\nif (my_grades > your_grades) {\n    console.log("Facts");\n} else {\n    console.log("Lies");\n} 
            \nwhile (my_grades < 100) {\n    my_grades = my_grades + 1;\n}`}
              language={"javascript"}
              showLineNumbers={true}
              wrapLines
            />
            <h1 className="mt-5 text-xl font-normal text-center text-black font-fredoka">
              JavaScript
            </h1>
          </div>
          <div className="px-32 py-16">
            <CodeBlock
              theme={dracula}
              text={`chope 1 table\nchope 2 benches\ntables not same benches\n\nchope 5 your_grades\nchope 10 my_grades\n\nsekali my_grades better than your_grades then simi("Facts") bobian simi("Lies")\nkeep on my_grades lousier than 100 then chope my_grades + 1 my_grades`}
              language={"python"}
              showLineNumbers={true}
              wrapLines
            />
            <h1 className="mt-5 text-xl font-normal text-center text-black font-fredoka">
              singaScript
            </h1>
          </div>
          <div className="flex flex-col place-items-center">
            <Image
              src="/keywords.png"
              alt="keyword-mappings"
              width={800}
              height={430}
            />
            <Image
              className="mt-20 mb-32"
              src="/operators.png"
              alt="operator-mappings"
              width={800}
              height={430}
            />
          </div>
        </div>
      </Modal>

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
