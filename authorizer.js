'use strict';

const jwt = require('jsonwebtoken');

const SECRET_KEY = 'secretKeyyyyy';

module.exports.generatePolicy = (token, methodArn) => {
  if (this.decodeToken(token) != null) {
    //Token was decoded successfully
    console.log('yey');
    return generatePolicy('user', 'Allow', methodArn);
  } else {
    //Token is not decoded properly
    console.log('nah');
    const error = new Error('Unauthorized');
    throw error;
  }
};

module.exports.generateToken = jsonToSign => {
  // sign with default (HMAC SHA256)
  var token = jwt.sign(jsonToSign, SECRET_KEY);
  console.log(token);
  return token;
};

module.exports.decodeToken = token => {
  try {
    var decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded);
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
};

var generatePolicy = function(principalId, effect, resource) {
  var authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    var policyDocument = {};
    policyDocument.Version = '2012-10-17'; // default version
    policyDocument.Statement = [];
    var statementOne = {};
    statementOne.Action = 'execute-api:Invoke'; // default action
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};
