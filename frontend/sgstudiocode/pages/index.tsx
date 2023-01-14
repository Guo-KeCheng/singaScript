import Link from "next/link";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const index = () => {
  return (
    <div>
      <div className="relative flex flex-col justify-center h-[100vh] content-center items-center">
        <div className="m-6 text-5xl text-white font-pressstart ">
          <TypeAnimation
            // Same String at the start will only be typed once, initially
            sequence={["SG STUDIO CODE"]}
            speed={30} // Custom Speed from 1-99 - Default Speed: 40
            wrapper="h1" // Animation will be rendered as a <span>
            repeat={5} // Repeat this Animation Sequence infinitely
          />
        </div>
        <div>
          <Link href={"/home"}>
            <button>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="px-16 py-3 mt-5 text-lg text-white rounded-lg bg-darkYellow font-pressstart hover:bg-gray-300 hover:text-black"
              >
                PLAY
              </motion.div>
            </button>
          </Link>
        </div>
      </div>
      <motion.div
        initial={{ x: -500, y: -500 }}
        animate={{ rotate: 360, x: 1000, y: -800 }}
        transition={{ repeat: Infinity, duration: 3, repeatType: "reverse" }}
        className="absolute"
      >
        <Image src="/merli.png" alt="merli" width={400} height={400} />
      </motion.div>
    </div>
  );
};

export default index;
