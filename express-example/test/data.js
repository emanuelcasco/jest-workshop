exports.AVAILABLE_CURRENCIES = ['ARS', 'USD', 'CLP', 'MXN', 'COP', 'BRL', 'PEN'];

exports.BASE_CURRENCY = 'USD';

exports.DEFAULT_CURRENCY = 'ARS';

exports.ALL_CURRENCIES = [exports.DEFAULT_CURRENCY, exports.BASE_CURRENCY, ...exports.AVAILABLE_CURRENCIES];

exports.CREDIT_CARD = 999999999999;

exports.CURRENT_BUDGET = {
  balance: {
    USD: '$33.95',
    ARS: '$1,904.21',
    CLP: '$24,210.47',
    MXN: '$662.19',
    COP: '$114,177.16',
    BRL: '$139.31',
    PEN: '$113.45'
  },
  prices: {
    ARS: 56.087032,
    CLP: 713.10058,
    MXN: 19.5044,
    COP: 3363,
    BRL: 4.103299,
    PEN: 3.34165
  }
};
