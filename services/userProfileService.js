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
    var statement = sqlStatements.getLounges;
    if (loungeCode) {
      params = [
        {
          name: "lounge_code",
          typeHint: "UUID",
          value: { stringValue: loungeCode }
        }
      ];
      statement = sqlStatements.getLoungeById;
    }
    var result = await rdsRepo.executeStatement(statement, params);
    var lounges = [];
    if (result.records) {
      result.records.forEach(element => {
        lounges.push({
          loungeCode: element[0].stringValue,
          loungeName: element[2].stringValue
        });
      });
    }
    return lounges;
  } catch (e) {
    log(e.name + ": " + e.message, "ERROR");
    return { error: { message: e.name + ": " + e.message } };
  }
}


function setupParameters(userProfileModel) {
  var parameters = [];
  parameters.push([
    { name: "id", typeHint: "UUID", value: { stringValue: uuidv1() } },
    { name: "firstName", value: { stringValue: userProfileModel.firstName } },
    { name: "lastName", value: { stringValue: userProfileModel.lastName } },
    { name: "phone", value: { stringValue: userProfileModel.phone } },
    { name: "email", value: { stringValue: userProfileModel.email } },
    { name: "maxContactsPerMeeting", value: { integerValue: userProfileModel.maxContactsPerMeeting } }
    // {
    //   name: "lounge_code",
    //   typeHint: "UUID",
    //   value: { stringValue: userProfileModel.loungeCode }
    // }
  ]);
  return parameters;
}



async function createProfile(newProfile){
  try {
    var parameters = setupParameters(newProfile);
    var transaction = await rdsRepo.beginTransaction();
    var result = await rdsRepo.batchExecuteTransaction(
      sqlStatements.createUserProfile,
      parameters,
      transaction.transactionId
    );
    await rdsRepo.commitTransaction(transaction.transactionId);
    var checkInDateTime =
      result.updateResults[0].generatedFields[8].stringValue;
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

module.exports.getProfile = getProfile;
module.exports.createProfile = createProfile;
