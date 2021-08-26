const { body, param, validationResult, header } = require("express-validator");
const guestValidationRules = () => {
  return [
    body("email").isEmail(),
    body("firstName").isLength({ min: 2 }),
    body("lastName").isLength({ min: 2 }),
    body("phone").isLength({ min: 7 }),
    body("loungeCode").isUUID(),
    body("loungeName").notEmpty(),
    body("estimatedExitTime")
      .isISO8601()
      .isAfter(),
    body("dependents")
      .optional()
      .bail(),
    body("dependents.*.email")
      .optional()
      .isEmail(),
    body("dependents.*.firstName")
      .optional()
      .isLength({ min: 2 }),
    body("dependents.*.lastName")
      .optional()
      .isLength({ min: 2 }),
    body("dependents.*.phone")
      .optional()
      .isLength({ min: 7 })
  ];
};
const guestCountValidationRules = () => {
  return [param("loungeCode").isUUID()];
};
const getLoungeValidaionRules = () => {
  return [
    param("loungeCode")
      .optional()
      .isUUID()
  ];
};

const loginValidationRules = () => {
  return [
    header("user").notEmpty(),
    header("password").notEmpty(),
    header("office").notEmpty()
  ];
};
const prefillValidationRules = () => {
  return [header("session").notEmpty()];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({
    message: extractedErrors
  });
};

module.exports = {
  guestValidationRules,
  guestCountValidationRules,
  getLoungeValidaionRules,
  loginValidationRules,
  prefillValidationRules,
  validate
};
