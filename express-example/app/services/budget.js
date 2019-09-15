const axios = require('axios');

const logger = require('../logger');
const errors = require('../errors');

const { budget: budgetConfig } = require('../../config');

exports.BUDGET_BASE_URL = budgetConfig.url;

const request = axios.create({ baseURL: exports.BUDGET_BASE_URL });

exports.availableCurrencies = () =>
  request
    .get('/available-currencies')
    .then(res => res.data)
    .catch(err => {
      logger.error(err);
      throw errors.externalError('Cannot fetch available currencies');
    });

exports.currencyBudget = (creditCardNumber, currency) =>
  request
    .get(`/balance/${creditCardNumber}`)
    .then(res => res.data)
    .then(({ balance, prices }) => ({
      budgetValue: balance[currency],
      currencyPrice: prices[currency],
      currency
    }))
    .catch(err => {
      logger.error(err);
      throw errors.externalError(`Cannot fetch ${currency} balance for credit card "${creditCardNumber}"`);
    });
