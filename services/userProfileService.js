const log = require("../utils/utils").log;
const rdsRepo = require("../modules/rdsRepository").rdsRepository(
  process.env.AURORA_CLUSTER_SECRET_ARN,
  process.env.AURORA_CLUSTER_ARN,
  process.env.RDS_DB
);
const sqlStatements = require("../database/statements");

async function getProfile(profileId) {
  try {
    var params = null;
    var statement = sqlStatements.getUserProfile;
    if (profileId) {
      params = [
        {
          name: "id",
          typeHint: "int",
          value: { stringValue: profileId }
        }
      ];
      statement = sqlStatements.getLoungeById;
    }
    var result = await rdsRepo.executeStatement(statement, params);
    var profiles = [];
    if (profiles.records) {
      result.records.forEach(element => {
        profiles.push({
          id: element[0].stringValue,
          firstname: element[1].stringValue,
          lastName: element[2].stringValue,
          email: element[3].stringValue,
          phone: element[4].stringValue,
          maxContactsPerMeeting: element[5].stringValue,
        });
      });
    }
    return profiles;
  } catch (e) {
    log(e.name + ": " + e.message, "ERROR");
    return { error: { message: e.name + ": " + e.message } };
  }
}

function setupParameters(userProfileModel) {
  var parameters = [];
  parameters.push([
    { name: "firstName", value: { stringValue: userProfileModel.firstName } },
    { name: "lastName", value: { stringValue: userProfileModel.lastName } },
    { name: "phone", value: { stringValue: userProfileModel.phone } },
    { name: "email", value: { stringValue: userProfileModel.email } },
    { name: "maxContactsPerMeeting", value: { integerValue: userProfileModel.maxContactsPerMeeting } }
  ]);
  return parameters;
}
async function createProfile(newProfile) {
  try {
    var parameters = setupParameters(newProfile);
    var transaction = await rdsRepo.beginTransaction();
    // eslint-disable-next-line no-unused-vars
    var result = await rdsRepo.batchExecuteTransaction(
      sqlStatements.createUserProfile,
      parameters,
      transaction.transactionId
    );
    await rdsRepo.commitTransaction(transaction.transactionId);
    // var profileId =
    //   result.updateResults[0].generatedFields[8].stringValue;
    return {
      firstName: newProfile.firstName,
      lastName: newProfile.lastName,
      email: newProfile.email,
      phone: newProfile.phone,
      maxContactsPerMeeting: newProfile.maxContactsPerMeeting,
      createdAtUtc: newProfile.createdAtUtc
    };
  } catch (e) {
    log(e.name + ": " + e.message, "ERROR");
    return { error: { message: e.name + ": " + e.message } };
  }
}
async function createFriendRequest(newRequest) {
  try {
    var parameters = [];
    parameters.push([
      { name: "fromUserProfileId", value: { stringValue: newRequest.fromUserProfileId } },
      { name: "toUserProfileId", value: { stringValue: newRequest.toUserProfileId } },
      { name: "requestStatus", value: { stringValue: newRequest.requestStatus } }
      //requestStatus int not NULL,
    ]);
    var transaction = await rdsRepo.beginTransaction();
    // eslint-disable-next-line no-unused-vars
    var result = await rdsRepo.batchExecuteTransaction(
      sqlStatements.createUserProfile,
      parameters,
      transaction.transactionId
    );
    await rdsRepo.commitTransaction(transaction.transactionId);
    // var profileId =
    //   result.updateResults[0].generatedFields[8].stringValue;
    return {
      fromUserProfileId: newRequest.fromUserProfileId,
      toUserProfileId: newRequest.toUserProfileId,
      requestStatus: newRequest.requestStatus
    };
  } catch (e) {
    log(e.name + ": " + e.message, "ERROR");
    return { error: { message: e.name + ": " + e.message } };
  }
}

module.exports.getProfile = getProfile;
module.exports.createProfile = createProfile;
module.exports.friendRequest = friendRequest;
