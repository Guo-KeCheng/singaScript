import { IChallenge } from "./types";

export const challenges: IChallenge[] = [
  {
    description:
      "'Huat ah' is a common expression used to express good luck, success, and prosperity. As we are approaching Chinese New Year, printing 'Huat ah!' to help Uncle Tan boost his luck for his next lottery.",
    testCases: [
      {
        id: 1,
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
        id: 1,
        function: "chopeTable(3, 4)",
        expectedResult: 5,
        parameters: { a: 3, b: 4 },
      },
      {
        id: 2,
        function: "chopeTable(3, 4)",
        expectedResult: 5,
        parameters: { a: 3, b: 4 },
      },
      {
        id: 3,
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
        id: 1,
        function: "chopeTable(1, 2)",
        expectedResult: 5,
        parameters: { a: 3, b: 2 },
      },
      {
        id: 2,
        function: "chopeTable(3, 4)",
        expectedResult: 3,
        parameters: { a: 2, b: 1 },
      },
      {
        id: 3,
        function: "chopeTable(5, 6)",
        expectedResult: 8,
        parameters: { a: 5, b: 3 },
      },
    ],
  },
  {
    description: "mport trace for requested module",
    testCases: [
      {
        id: 1,
        function: "chopeTable(3, 7)",
        expectedResult: "helloo",
        parameters: { a: 2, b: 4 },
      },
    ],
  },
];
