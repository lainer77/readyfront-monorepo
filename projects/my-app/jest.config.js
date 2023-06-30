module.exports = {
    preset: 'ts-jest',
    setupFilesAfterEnv: ['./src/setupTests.js'],
    testEnvironment: 'jsdom',
};
