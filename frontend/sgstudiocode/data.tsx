import { IChallenge } from "./types";

export const challenges: IChallenge[] = [
  {
    description:
      "compiled client and server successfully in 66 ms (234 modules)",
    testCases: [
      {
        function: "chopeTable(3, 4)",
        expectedResult: 5,
        parameters: { a: 3, b: 4 },
      },
    ],
  },
  {
    description: "Import trace for requested module:",
    testCases: [
      {
        function: "chopeTable(3, 4)",
        expectedResult: 5,
        parameters: { a: 3, b: 4 },
      },
      {
        function: "chopeTable(3, 4)",
        expectedResult: 5,
        parameters: { a: 3, b: 4 },
      },
      {
        function: "chopeTable(3, 4)",
        expectedResult: 5,
        parameters: { a: 3, b: 4 },
      },
    ],
  },
  {
    description:
      "-server.browser.development.js:6076:14)at renderNode (/Users/nicholas/Documents/SoftwareProjects/Hackn",
    testCases: [
      {
        function: "chopeTable(3, 4)",
        expectedResult: 5,
        parameters: { a: 3, b: 4 },
      },
    ],
  },
  {
    description: "mport trace for requested module",
    testCases: [
      {
        function: "chopeTable(3, 7)",
        expectedResult: "helloo",
        parameters: { a: 2, b: 4 },
      },
    ],
  },
];
