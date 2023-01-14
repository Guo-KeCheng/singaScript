import React, { useState, useEffect } from "react";

import { challenges } from "@/data";
import ChallengeCard from "@/components/ChallengeCard";

import MerliCard from "@/components/MerliCard";
import ButtonSegment from "@/components/ButtonSegment";
import IDE from "@/components/IDE";
import TestCase from "@/components/TestCase";
import axios from "axios";
import { getRandomArbitrary } from "./utils";

const Home = () => {
  const [activeChallenge, setActiveChallenge] = useState(0);
  const [validChallenges, setValidChallenges] = useState(
    // Array(challenges.length).fill(false)
    [true, true, false, false, true, true, true, true]
  );

  const [savedIdeState, saveIdeState] = useState(
    Array(challenges.length).fill('print("HelloWorld")')
  );
  const [code, setCode] = useState('print("HelloWorld")');
  const [IDEoutput, setIDEOutput] = useState("");
  const [challengeOutput, setChallengeOutput] = useState("");

  const [hasSubmittedChallenge, setSubmittedChallenge] = useState(false);
  const [correctAnsCount, setCorrectAnsCount] = useState(0);

  useEffect(() => {
    setSubmittedChallenge(false);
    setCorrectAnsCount(0);
    console.log(activeChallenge, "- Has changed");
  }, [activeChallenge, correctAnsCount]);

  const [merliEmotion, setMerliEmotion] = useState("happy");
  const [merliSpeech, setMerliSpeech] = useState(
    "Hello fellow Singaporeans! Welcome to singaScript! Have fun!"
  );

  const merliConfused = [
    "Alamak why your code so bad one?",
    "Aiyo, so terrible!",
    "Your coding damn jialat sia",
    "Your neigbour next door can code better than you sia",
  ];
  const merliExcited = ["Not bad ah!", "Good try la!"];
  const merliLove = [
    "Wahh power la!",
    "Shiok ah!",
    "Wah your coding skills very good ah!",
    "Can get into Google already sia!",
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

  // updates the merli mascot expressions and speeches dependending on
  // how well the user scored, or if there was an exception
  const updateMerli: (exception: boolean, userScore: number) => void =
    function (exception: boolean, userScore: number): void {
      if (exception) {
        setMerliEmotion("confused");
        const speech =
          merliConfused[getRandomArbitrary(0, merliConfused.length)];
        setMerliSpeech(speech);
      } else {
        if (userScore > 0 && userScore < 1) {
          setMerliEmotion("merliExcited");
          const speech =
            merliExcited[getRandomArbitrary(0, merliExcited.length)];
          setMerliSpeech(speech);
        } else if (userScore === 1) {
          setMerliEmotion("merliLove");
          const speech = merliLove[getRandomArbitrary(0, merliLove.length)];
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
      if (userResult === currentTestCases[i].expectedResult) {
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
      .post("http://localhost:3000/submit", submissionData)
      .then(({ data }) => {
        setChallengeOutput(data);
        setIDEOutput(data);
        setSubmittedChallenge(true);

        // const userScore = getUserScore();
        // updateMerli(, userScore)

        // if (userScore === 1) {
        //   completeChallengeSuccess()
        // }

        // check result and completeChallengeSuccess if the result matches the expected value
      });
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
          <ChallengeCard
            challenge={activeChallenge}
            goToNext={goToNext}
            hasCompletedChallenge={validChallenges[activeChallenge]}
          />
          <IDE output={IDEoutput} code={code} setCode={setCode} />
        </div>

        <div className="col-span-4">
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
                    {" "}
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
                        userResult={challengeOutput}
                        expectedResult={testCase.expectedResult}
                      />
                    )
                  )}
                </div>
              </div>
            ) : null}

            <ButtonSegment
              canProceed={validChallenges[activeChallenge]}
              submitCode={submitCode}
              runCode={submitCode}
              goToNext={goToNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
