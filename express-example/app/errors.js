const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.REQUEST_ERROR = 'request_error';
exports.requestError = message => internalError(message, exports.REQUEST_ERROR);

exports.EXTERNAL_ERROR = 'external_error';
exports.externalError = message => internalError(message, exports.EXTERNAL_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);
