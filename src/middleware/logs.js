'use strict';
const correlationIds = require('./correlation-ids');
const LogLevels = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
};

const DEFAULT_CONTEXT = {
  awsRegion: process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION,
  functionName: process.env.AWS_LAMBDA_FUNCTION_NAME,
  functionVersion: process.env.AWS_LAMBDA_FUNCTION_VERSION,
  functionMemorySize: process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE,
  stage: process.env.ENVIRONMENT || process.env.STAGE
};

function getContext () {
  // if there's a global variable for all the current request context then use it.
  const context = correlationIds.get();
  // const context = undefined;
  if (!context) {
    return Object.assign({}, DEFAULT_CONTEXT, context);
  };
  return DEFAULT_CONTEXT;
};

// default is debug when do not defined log level
function logLevelName () {
  return process.env.log_level || 'DEBUG';
};

function isEnabled (level) {
  return level >= LogLevels[logLevelName()];
};

function appendError (params, error) {
  if (!error) {
    return params;
  }

  return Object.assign(
    {},
    params || {},
    { errorName: error.name, errorMessage: error.message, stackTrace: error.stack }
  );
}

function log (levelName, message, params) {
  if (!isEnabled(LogLevels[levelName])) {
    return;
  }

  const context = getContext();
  const logMsg = Object.assign({}, context, params);
  logMsg.level = levelName;
  logMsg.message = message;
  console.log(JSON.stringify(logMsg));
}

module.exports.debug = (msg, params) => log('DEBUG', msg, params);
module.exports.info = (msg, params) => log('INFO', msg, params);
module.exports.warn = (msg, params, error) => log('WARN', msg, appendError(params, error));
module.exports.error = (msg, params, error) => log('ERROR', msg, appendError(params, error));
module.exports.ignore = (msg, params, error) => log('IGNORE', msg, appendError(params, error));
