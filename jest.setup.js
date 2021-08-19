require('mithril');

// https://www.npmjs.com/package/mithril-query
// "In order to run tests in mithril 2.x we need to do some setup.
// That is to mock the dom for the mithril render and request modules."
global.window = Object.assign(
  require('mithril/test-utils/domMock.js')(),
  require('mithril/test-utils/pushStateMock')()
);
global.requestAnimationFrame = (callback) => global.setTimeout(callback, 1000 / 60);

// Needed to stop TypeError: window.matchMedia is not a function
// when importing construct ui components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
