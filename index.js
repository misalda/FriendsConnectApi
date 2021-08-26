const serverless = require("serverless-http");
const express = require("express");
var userService = require("./services/userService");
var loungeService = require("./services/loungeService");
var guestService = require("./services/guestService");
const {
  loginValidationRules,
  guestValidationRules,
  guestCountValidationRules,
  getLoungeValidaionRules,
  prefillValidationRules,
  validate
} = require("./utils/validators");
var app = express();
app.use(express.json());
app.post("/login", loginValidationRules(), validate, async (req, res) => {
  var response = await userService.staffLogin(req.headers);
  if (response.error) {
    res
      .status(response.code != null ? response.code : 500)
      .json(response.error);
    return;
  }
  res.status(200).json(response);
});
app.post("/guest", guestValidationRules(), validate, async (req, res) => {
  const response = await guestService.createGuest(req.body);
  if (response.error) {
    res
      .status(response.code != null ? response.code : 500)
      .json(response.error);
    return;
  }
  res.status(200).json(response);
});
app.post(
  "/guest/prefill",
  prefillValidationRules(),
  validate,
  async (req, res) => {
    const response = await guestService.prefillGuest(
      req.body,
      req.params.loungeCode,
      "",
      req.headers.session
    );
    if (response.error) {
      res
        .status(response.code != null ? response.code : 500)
        .json(response.error);
      return;
    }
    res.status(200).json(response);
  }
);
app.get(
  "/lounge/:loungeCode?",
  getLoungeValidaionRules(),
  validate,
  async (req, res) => {
    const response = await loungeService.getLounges(req.params.loungeCode);
    if (response.error) {
      res
        .status(response.code != null ? response.code : 500)
        .json(response.error);
      return;
    }
    res.status(200).json(response);
  }
);
app.get(
  "/guestCount/:loungeCode",
  guestCountValidationRules(),
  validate,
  async (req, res) => {
    const response = await guestService.getGuestCount(req.params.loungeCode);
    if (response.error) {
      res
        .status(response.code != null ? response.code : 500)
        .json(response.error);
      return;
    }
    res.status(200).json(response);
  }
);
module.exports.handler = serverless(app);
