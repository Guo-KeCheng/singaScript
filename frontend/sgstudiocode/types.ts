export interface IChallenge {
    description: string,
    testCases: ITestCase[]
}


export interface ITestCase {
    function: string,
    expectedResult: number | boolean | string,
    parameters: Object
}