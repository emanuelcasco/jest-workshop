const MyFunction = require('./index');

const defaultContext = {
  log: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  }
};

describe('sum functionality', () => {
  test('sum should be 3', done => {
    const context = {
      ...defaultContext,
      done: (err, res) => {
        expect(err).toBe(null);
        expect(res).toBe(3);
        done();
      }
    };

    MyFunction(context, { x: 1, y: 2 });
  });
});