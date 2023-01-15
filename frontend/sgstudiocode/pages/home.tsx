import React, { useState, useEffect } from "react";

import { challenges } from "@/data";
import ChallengeCard from "@/components/ChallengeCard";

import MerliCard from "@/components/MerliCard";
import ButtonSegment from "@/components/ButtonSegment";
import IDE from "@/components/IDE";
import TestCase from "@/components/TestCase";
import axios from "axios";
import { getRandomArbitrary } from "@/components/utils";
import { motion } from "framer-motion";
import { fadeInUp, stagger } from "@/styles/animations";

const Home = () => {
  const [activeChallenge, setActiveChallenge] = useState(0);
  const [validChallenges, setValidChallenges] = useState(
    Array(challenges.length).fill(false)
  );

  const [savedIdeState, saveIdeState] = useState(
    Array(challenges.length).fill('simi("HelloWorld")')
  );
  const [code, setCode] = useState('simi("HelloWorld")');
  const [IDEoutput, setIDEOutput] = useState("");

  const results: string[] = [];
  const [challengeOutput, setChallengeOutput] = useState(results);

  const [hasSubmittedChallenge, setSubmittedChallenge] = useState(false);
  const [correctAnsCount, setCorrectAnsCount] = useState(0);

  // useEffect(() => {
  //   console.log(activeChallenge, "- Has changed");
  // }, [activeChallenge, correctAnsCount]);

  const [merliEmotion, setMerliEmotion] = useState("happy");
  const [merliSpeech, setMerliSpeech] = useState(
    "Hi fellow Singaporeans! Welcome to singaScript! Have fun!"
  );

  const merliGeneral = [
    "Wah today weather quite hot ah",
    "How are you liking singaScript so far?",
    "Please ignore any bugs you find UwU",
    "Wah CNY is coming sia very excited",
    "How are you today?",
    "Hello! I'm Merli from STB!",
    "If you dk how use singaScript, refer to documentation on GitHub okay?",
    "A UDP packet walks into a bar. A UDP packet walks into a bar. A UDP packet walks into a bar. The bartender says 'hello'.",
    "A TCP packet walks into a bar and says 'I’d like a beer.' The barman replies 'You’d like a beer?' 'Yes,'replies the TCP packet, 'I’d like a beer.'",
    "Hello! I'm Merli from STB!",
    "Q. How many software engineers does it take to change a light bulb? A. None. It's a hardware problem.",
    "When do two functions fight? When they have arguments!",
    "What happened to all the illegal exceptions? They were all caught!",
  ];
  const merliConfused = [
    "Alamak why your code so bad one?",
    "Aiyo, so terrible!",
    "Your coding damn jialat sia....",
    "Your neigbour next door can code better than you sia",
    "My grandmother can code better than you!",
  ];
  const merliExcited = ["Not bad ah!", "Good try la!"];
  const merliLove = [
    "Wahh power la!",
    "Shiok ah!",
    "Wah your coding skills very good ah!",
    "Can get into Google already sia!",
    "CS god please give me enlightenment!",
  ];

  // Populates the IDE view with the data from the specified challenge
  const populateIDE: (challengeIndex: number) => void = function (
    challengeIndex: number
  ): void {
    setCode(savedIdeState[challengeIndex]);
  };

  // Updates the the game by saving the IDE state at the current index,
  // and advances the challenge to the next or previous

  const updateGameState: (challengeIndex: number, toAdvance: boolean) => void =
    function (challengeIndex: number, toAdvance: boolean): void {
      const clonedSavedIdeState = [...savedIdeState];
      clonedSavedIdeState[challengeIndex] = code;
      saveIdeState(clonedSavedIdeState);

      if (toAdvance) {
        setActiveChallenge(challengeIndex + 1);
        populateIDE(challengeIndex + 1);
      } else {
        setActiveChallenge(challengeIndex - 1);
        populateIDE(challengeIndex - 1);
      }
    };

  // marks a particular challenge as completed
  const completeChallengeSuccess: (challengeIndex: number) => void = function (
    challengeIndex: number
  ): void {
    const clonedValidChallengeState = [...validChallenges];
    clonedValidChallengeState[challengeIndex] = true;
    setValidChallenges(clonedValidChallengeState);
  };

  // marks a particular challenge as completed
  const refreshStates: () => void = function (): void {
    setCorrectAnsCount(0);
    setSubmittedChallenge(false);
    setMerliEmotion("happy");
    var speech =
      merliGeneral[Math.floor(getRandomArbitrary(0, merliGeneral.length))];

    setMerliSpeech(speech);

    setIDEOutput("");
  };

  // updates the merli mascot expressions and speeches dependending on
  // how well the user scored, or if there was an exception
  const updateMerli: (exception: boolean, userScore: number) => void =
    function (exception: boolean, userScore: number): void {
      if (exception || userScore == 0) {
        setMerliEmotion("confused");
        const speech =
          merliConfused[
            Math.floor(getRandomArbitrary(0, merliConfused.length))
          ];
        setMerliSpeech(speech);
      } else {
        if (userScore > 0 && userScore < 1) {
          setMerliEmotion("excited");
          const speech =
            merliExcited[
              Math.floor(getRandomArbitrary(0, merliExcited.length))
            ];
          setMerliSpeech(speech);
        } else if (userScore == 1) {
          setMerliEmotion("love");
          const speech =
            merliLove[Math.floor(getRandomArbitrary(0, merliLove.length))];
          setMerliSpeech(speech);
        }
      }
    };

  const getUserScore: (
    userResults: Array<string | number | boolean>,
    submittedChallenge: number
  ) => number = function (
    userResults: Array<string | number | boolean>,
    submittedChallenge: number
  ): number {
    const currentTestCases = challenges[submittedChallenge].testCases;
    const numTestCases = currentTestCases.length;
    var correctAnswers = 0;

    for (let i = 0; i < currentTestCases.length; i++) {
      const userResult = userResults[i];

      if (userResult == currentTestCases[i].expectedResult) {
        correctAnswers += 1;
      }
    }
    //update the users score
    setCorrectAnsCount(correctAnswers);

    return correctAnswers / numTestCases;
  };

  // Controls whether the user is allowed to advance (eg if the game state is allowed to go to next or prev)

  let goToNext: (toAdvance: boolean) => void = function (
    toAdvance: boolean
  ): void {
    refreshStates();
    if (toAdvance && validChallenges[activeChallenge] === true) {
      if (activeChallenge + 1 < challenges.length) {
        updateGameState(activeChallenge, toAdvance);
      }
    } else if (!toAdvance && activeChallenge - 1 > -1) {
      updateGameState(activeChallenge, toAdvance);
    }
    console.log(savedIdeState);
  };

  const submitCode = () => {
    console.log(code);

    const submissionData = {
      challengeIndex: activeChallenge,
      testCases: challenges[activeChallenge].testCases,
      userInput: code,
    };

    axios
      .post("https://singascript-backend.herokuapp.com/submit", submissionData)
      .then((response) => {
        console.log(response);

        if (response.status !== 200) {
          console.log("Error occurred");
          console.log(response);
          setMerliSpeech(
            "Walao eh our code crashed :( Don't worry la you can try again next time!"
          );
          return;
        }

        function compareFunction(a: any, b: any) {
          if (a.testIndex > b.testIndex) return 1;
          else return -1;
        }

        const testCaseResponses = response.data.sort(compareFunction);

        if (testCaseResponses.length === 0) {
          console.log("Error occurred, received empty list");
          return;
        }

        const testCaseResultsStr = [];
        const testCaseResults: any[] = [];

        for (let i = 0; i < testCaseResponses.length; i++) {
          const testCaseResponse = testCaseResponses[i];
          testCaseResultsStr.push(String(testCaseResponse.output.slice(-1)));
          testCaseResults.push(testCaseResponse.output.slice(-1));
        }

        setChallengeOutput(testCaseResultsStr);

        //setIDEOutput(data.output);

        setSubmittedChallenge(true);

        const userScore = getUserScore(
          testCaseResults,
          testCaseResponses[0].challengeIndex
        );

        updateMerli(testCaseResponses.slice(-1).exceptionOccurred, userScore);

        if (userScore === 1) {
          completeChallengeSuccess(testCaseResponses[0].challengeIndex);
          console.log("challenge success");
        } else {
          console.log("challenge failed");
        }
        // check result and completeChallengeSuccess if the result matches the expected value
      });
  };

  const runCode = () => {
    console.log(code);

    const submissionData = {
      userInput: code,
    };

    axios
      .post("https://singascript-backend.herokuapp.com/run", submissionData)
      .then((response) => {
        if (response.status !== 200) {
          console.log("Error occurred");
          console.log(response);
          setMerliSpeech(
            "Walao eh our code crashed :( Don't worry la you can try again next time!"
          );
          return;
        }

        const data = response.data;

        if (data.exceptionOccurred) {
          setIDEOutput(data.exceptionMsg);
        } else {
          const codeOutput = data.output.flat(Infinity);
          for (let i = 0; i < codeOutput.length; i++) {
            codeOutput[i] = `what u get > ${codeOutput[i]}`;
          }
          var speech =
            merliGeneral[
              Math.floor(getRandomArbitrary(0, merliGeneral.length))
            ];

          setMerliSpeech(speech);
          setIDEOutput(codeOutput.join("\n"));
        }
      });
  };

  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="p-5"
    >
      <div className="flex justify-center m-6">
        <h1 className="text-3xl text-white font-pressstart">
          <span className="text-darkYellow">SG </span>STUDIO CODE
        </h1>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <motion.div variants={fadeInUp} className="col-span-8">
          <ChallengeCard
            challenge={activeChallenge}
            goToNext={goToNext}
            hasCompletedChallenge={validChallenges[activeChallenge]}
          />
          <IDE output={IDEoutput} code={code} setCode={setCode} />
        </motion.div>

        <motion.div variants={fadeInUp} className="col-span-4">
          <div className="h-[75vh]">
            <MerliCard
              speech={merliSpeech}
              emotion={merliEmotion}
              hasSubmittedChallenge={hasSubmittedChallenge}
            />

            {hasSubmittedChallenge ? (
              <div className="p-2 mt-5 rounded-md bg-greyOutline outline outline-4 outline-offset-0 outline-greyOutline">
                <div className="flex items-end justify-center py-3 text-lg font-bold bg-white rounded-lg font-fredoka">
                  <span className="text-3xl font-bold text-darkRed font-fredoka">
                    {correctAnsCount} of{" "}
                    {challenges[activeChallenge].testCases.length}&nbsp;
                  </span>{" "}
                  test cases passed!
                </div>
                <div className="mt-2 overflow-auto h-60">
                  {challenges[activeChallenge].testCases.map(
                    (testCase, index) => (
                      <TestCase
                        key={index}
                        func={testCase.function}
                        userResult={challengeOutput[index]}
                        expectedResult={testCase.expectedResult}
                      />
                    )
                  )}
                </div>
              </div>
            ) : null}

            <ButtonSegment
              challengeIndex={activeChallenge}
              canProceed={validChallenges[activeChallenge]}
              submitCode={submitCode}
              runCode={runCode}
              goToNext={goToNext}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
