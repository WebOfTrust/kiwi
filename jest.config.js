/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./jest.setup.js', './jest.env.js'],
    globals: {
        NODE_ENV: 'test',
    },
    verbose: true,
};
