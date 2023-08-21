interface TestData {
    age: number;
    gender: 'female' | 'male';
    memo?: string;
    name: string;
}
export function testLog(data: TestData): boolean {
    console.log('tetstestsetsetset', JSON.stringify(data));

    return false;
}
