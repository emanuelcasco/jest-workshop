/* eslint-disable init-declarations */

const nock = require('nock');
const request = require('supertest');

const { BUDGET_BASE_URL } = require('../app/services/budget');

const logger = require('../app/logger');
const app = require('../app');

jest.mock('../app/logger');

const { AVAILABLE_CURRENCIES } = require('./data.js');

describe('GET /availableCurrencies', () => {
  describe('200 OK', () => {
    let response;

    beforeAll(done => {
      nock(BUDGET_BASE_URL)
        .get('/available-currencies')
        .reply(200, AVAILABLE_CURRENCIES);
      request(app)
        .get('/availableCurrencies')
        .end((err, res) => {
          if (err) throw err;
          response = res;
          done();
        });
    });

    test('should return 200', () => {
      expect(response.status).toBe(200);
    });

    test('should return all currencies', () => {
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body.currencies).toEqual(expect.any(Array));
      expect(response.body).toEqual({
        currencies: AVAILABLE_CURRENCIES
      });
    });

    test('should make logs', () => {
      expect(logger.info).toBeCalledWith('Get available currencies.');
      expect(logger.info).toBeCalledWith('Available currencies fetched.');
    });
  });

  describe('503 External Error', () => {
    let response;

    beforeAll(done => {
      nock(BUDGET_BASE_URL)
        .get('/available-currencies')
        .reply(500, {
          message: 'something went wrong'
        });
      request(app)
        .get('/availableCurrencies')
        .end((err, res) => {
          if (err) throw err;
          response = res;
          done();
        });
    });

    test('should return 503', () => {
      expect(response.status).toBe(503);
    });

    test('should return a meaningful response', () => {
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toEqual({
        message: 'Cannot fetch available currencies',
        internal_code: 'external_error'
      });
    });
  });
});
