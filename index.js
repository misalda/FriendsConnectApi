const serverless = require("serverless-http");
const express = require("express");
var loungeService = require("./services/userProfileService");
var userProfile = require("./services/userProfileService");
// const {
//   loginValidationRules,
//   guestValidationRules,
//   guestCountValidationRules,
//   getLoungeValidaionRules,
//   prefillValidationRules,
//   validate
// } = require("./utils/validators");
var app = express();
app.use(express.json());
app.post("/userProfile"/*, guestValidationRules(), validate,*/, async (req, res) => {
  const response = await userProfile.createUserProfile(req.body);
  if (response.error) {
    res
      .status(response.code != null ? response.code : 500)
      .json(response.error);
    return;
  }
  res.status(200).json(response);
});
app.post("/friendsRequest"/*, guestValidationRules(), validate,*/, async (req, res) => {
  const response = await userProfile.createFriendRequest(req.body);
  if (response.error) {
    res
      .status(response.code != null ? response.code : 500)
      .json(response.error);
    return;
  }
  res.status(200).json(response);
});
app.get(
  "/userProfile/:profileId?",
  async (req, res) => {
    const response = await loungeService.getUserProfile(req.params.loungeCode);
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
