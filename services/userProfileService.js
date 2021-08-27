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
async function createProfile(newProfile){

}
module.exports.getProfile = getProfile;
module.exports.createProfile = createProfile;
