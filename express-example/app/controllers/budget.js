const logger = require('../logger');

const { availableCurrencies, currencyBudget } = require('../services/budget');

exports.getAvailableCurrencies = (req, res, next) => {
  logger.info('Get available currencies.');

  return availableCurrencies()
    .then(currencies => {
      logger.info('Available currencies fetched.');
      return res.status(200).send({ currencies });
    })
    .catch(next);
};

exports.getCurrentBudget = (req, res, next) => {
  logger.info('Get current budget.');

  const { creditCardNumber } = req.params;
  const { currency = 'ARS' } = req.query;

  return currencyBudget(creditCardNumber, currency.toUpperCase())
    .then(budget => {
      logger.info('Current budget fetched.');
      return res.status(200).send(budget);
    })
    .catch(next);
};
