import { IChallenge } from "./types";

export const challenges: IChallenge[] = [
  {
    description:
      "'Huat ah' is a common expression used to express good luck, success, and prosperity.\n\nAs we are approaching Chinese New Year, print 'Huat ah!' to help Uncle Tan boost his luck for his next lottery.",
    testCases: [
      {
        id: 1,
        function: "expect('Huat ah!')",
        expectedResult: "Huat ah!",
        parameters: {},
      },
    ],
  },
  {
    description:
      "It's lunch time and there is no available seats to be found in the food court at CBD. Suddenly you spot a tiny table from the corner of your eye. You swiftly whip out your packet of tissue paper and launch it towards the table. \n\nUse the keyword 'chope' to assign the table with 1 packet of tissue.",
    testCases: [
      {
        id: 1,
        function: "Expect(table = 1)",
        expectedResult: 1,
        parameters: {},
      },
    ],
  },
  {
    description:
      "Alamak! You just got back your test results and it looks like your parents will be comparing you to your neighbour, Dueet again. Forge your test results to make sure you appear to be than him! \n\nAssign two variables 'my_grades' and 'his_grades' and prove to your parents by showing 'my_grades' is better.",
    testCases: [
      {
        id: 1,
        function: "expect(my_grades > his_grades)",
        expectedResult: "true",
        parameters: {},
      },
    ],
  },
  {
    description:
      "Gopal has X apples. He sells Y apples to Xiao Ming. Each apple cost $1.25. \n\nDefine a function body   sellApples(X, Y) { body }    using parameters X and Y to find out how much worth of apples Gopal has left. \nHint: Basic math taught by Mrs Lim.",
    testCases: [
      {
        id: 1,
        function: "sellApples(10, 7)",
        expectedResult: 3.75,
        parameters: { X: 10, Y: 7 },
      },
      {
        id: 2,
        function: "sellApples(5, 3)",
        expectedResult: 2.5,
        parameters: { X: 5, Y: 3 },
      },
      {
        id: 3,
        function: "sellApples(8, 7)",
        expectedResult: 1.25,
        parameters: { X: 8, Y: 7 },
      },
      {
        id: 4,
        function: "sellApples(50, 8)",
        expectedResult: 52.5,
        parameters: { X: 50, Y: 8 },
      },
    ],
  },
  {
    description:
      "Your girlfriend: 'BB, I am hungry.'\nYou: 'What you want to eat?' \nYour girlfriend: 'Idk leh. Anything, you decide.'\nYou: '???' \n\nChoose two restaurants of your choice and ask your girlfriend to rank them to find out which restaurant to go to. Suggest (by printing) the higher ranking restaurant.",
    testCases: [
      {
        id: 1,
        function: "betterRestaurant(5, 4)",
        expectedResult: 5,
        parameters: { a: 5, b: 4 },
      },
      {
        id: 2,
        function: "betterRestaurant(5, 3)",
        expectedResult: 5,
        parameters: { a: 5, b: 3 },
      },
      {
        id: 3,
        function: "betterRestaurant(10, 11)",
        expectedResult: 11,
        parameters: { a: 10, b: 11 },
      },
      {
        id: 4,
        function: "betterRestaurant(50, 50)",
        expectedResult: 50,
        parameters: { a: 50, b: 50 },
      },
    ],
  },
];
