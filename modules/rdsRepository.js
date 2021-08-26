const aws = require("aws-sdk");
const rdsDataService = new aws.RDSDataService();

module.exports.rdsRepository = function rdsRepository(
  secretArn,
  rdsArn,
  dbName
) {
  function executeStatement(sqlStatement, parameters, transactionId) {
    let sqlParams = {
      secretArn: secretArn,
      resourceArn: rdsArn,
      sql: sqlStatement,
      database: dbName,
      includeResultMetadata: true,
      parameters: parameters,
      transactionId: transactionId
    };

    // run SQL command
    var data = rdsDataService.executeStatement(sqlParams).promise();
    return data;
  }
  function beginTransaction() {
    let sqlParams = {
      secretArn: secretArn,
      resourceArn: rdsArn,
      database: dbName
    };
    return rdsDataService.beginTransaction(sqlParams).promise();
  }
  function commitTransaction(transactionId) {
    let sqlParams = {
      secretArn: secretArn,
      resourceArn: rdsArn,
      transactionId: transactionId
    };
    return rdsDataService.commitTransaction(sqlParams).promise();
  }
  function batchExecuteTransaction(sqlStatement, parameterSets, transactionId) {
    let sqlParams = {
      secretArn: secretArn,
      resourceArn: rdsArn,
      sql: sqlStatement,
      database: dbName,
      parameterSets: parameterSets,
      transactionId: transactionId
    };
    return rdsDataService.batchExecuteStatement(sqlParams).promise();
  }

  return {
    executeStatement: executeStatement,
    batchExecuteTransaction: batchExecuteTransaction,
    commitTransaction: commitTransaction,
    beginTransaction: beginTransaction
  };
};
