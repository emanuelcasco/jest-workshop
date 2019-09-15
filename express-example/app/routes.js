const validate = require('./middlewares/validate');

const budgetController = require('./controllers/budget');

exports.init = app => {
  /**
   * GET /availableCurrencies
   * List of available currencies
   */
  app.get('/availableCurrencies', budgetController.getAvailableCurrencies);

  /**
   * GET /currentBudget/:creditCardNumber?currency
   * Get credit card current budget with custom currency (ARS)
   */
  app.get(
    '/currentBudget/:creditCardNumber',
    validate({
      query: {
        type: 'object',
        properties: {
          currency: { type: 'string' }
        }
      },
      params: {
        type: 'object',
        properties: {
          creditCardNumber: { type: 'number', nullable: false }
        }
      }
    }),
    budgetController.getCurrentBudget
  );
};
