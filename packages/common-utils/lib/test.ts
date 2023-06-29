interface TestData {
    name: string;
    age: number;
    gender: 'male' | 'female';
    memo?: string;
}
export function testLog(data: TestData): boolean {
    console.log('tetstestsetsetset', JSON.stringify(data));

    return false;
}
