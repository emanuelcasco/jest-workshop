/* eslint-disable init-declarations */
const nock = require('nock');
const request = require('supertest');

const { BUDGET_BASE_URL } = require('../app/services/budget');

const app = require('../app');

const { ALL_CURRENCIES, BASE_CURRENCY, DEFAULT_CURRENCY, CREDIT_CARD, CURRENT_BUDGET } = require('./data');

describe('GET /currentBudget/:creditCardNumber', () => {
  describe('200 OK', () => {
    let response;

    beforeAll(done => {
      nock(BUDGET_BASE_URL)
        .get(`/balance/${CREDIT_CARD}`)
        .reply(200, CURRENT_BUDGET);
      request(app)
        .get(`/currentBudget/${CREDIT_CARD}`)
        .end((err, res) => {
          if (err) throw err;
          response = res;
          done();
        });
    });

    test('should return 200', () => {
      expect(response.status).toBe(200);
    });

    test('should return budget for default currency', () => {
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toEqual({
        budgetValue: CURRENT_BUDGET.balance[DEFAULT_CURRENCY],
        currencyPrice: CURRENT_BUDGET.prices[DEFAULT_CURRENCY],
        currency: DEFAULT_CURRENCY
      });
    });
  });

  describe.each(ALL_CURRENCIES)('200 OK for "%s" currency', currency => {
    let response;

    beforeAll(done => {
      nock(BUDGET_BASE_URL)
        .get(`/balance/${CREDIT_CARD}`)
        .reply(200, CURRENT_BUDGET);
      request(app)
        .get(`/currentBudget/${CREDIT_CARD}`)
        .query({ currency })
        .end((err, res) => {
          if (err) throw err;
          response = res;
          done();
        });
    });

    afterAll(done => {
      app.close(done);
    });

    test(`should return 200 "${currency}" currency`, () => {
      expect(response.status).toBe(200);
    });

    test(`should return budget for "${currency}" currency`, () => {
      expect(response.body).toEqual(expect.any(Object));

      const expectedBody = {
        budgetValue: CURRENT_BUDGET.balance[currency],
        currency
      };

      if (currency !== BASE_CURRENCY) expectedBody.currencyPrice = CURRENT_BUDGET.prices[currency];
      expect(response.body).toEqual(expectedBody);
    });
  });
});
