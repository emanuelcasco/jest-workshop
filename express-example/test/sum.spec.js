const utils = require('../utils');

describe('sum method', () => {
  const { sum } = utils;
  test('positive values', () => {
    expect(sum(1, 2)).toBe(3);
  });
  test.skip('positive values', () => {
    expect({ result: sum(1, 2) }).toBe({ result: 3 });
  });
  test.todo('positive values');
});
