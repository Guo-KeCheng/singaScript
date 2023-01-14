export interface IChallenge {
    description: string,
    testCases: ITestCase[]
}


export interface ITestCase {
    id: number
    function: string,
    expectedResult: number | boolean | string,
    parameters: Object
}