module.exports = {
  successResponse: responseObject => ({
    statusCode: 200,
    body: JSON.stringify(responseObject)
  }),
  failureResponse: errorString => ({
    statusCode: 404,
    body: JSON.stringify({ error: errorString })
  })
};
