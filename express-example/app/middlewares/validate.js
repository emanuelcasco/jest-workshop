const Ajv = require('ajv');

const errors = require('../errors');

const ajv = new Ajv({ coerceTypes: true, allErrors: true });

const generateErrorMessage = errorsList =>
  errorsList.map(error => ({
    path: error.dataPath,
    message: error.message
  }));

module.exports = schema => (req, res, next) => {
  const validate = ajv.compile({
    type: 'object',
    properties: {
      ...schema
    }
  });
  if (validate(req)) return next();

  const errorMsg = generateErrorMessage(validate.errors);
  return next(errors.requestError(errorMsg));
};
