module.exports = class PaymentError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, PaymentError);
  }
};

module.exports = class CrypticError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, CrypticError);
  }
};
