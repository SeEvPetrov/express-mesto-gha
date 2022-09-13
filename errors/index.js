const { BadRequestError } = require('./BadRequestError');
const { ErrorConflict } = require('./ErrorConflict');
const { ErrorNotFound } = require('./ErrorNotFound');
const { ForbiddenError } = require('./ForbiddenError');
const { AuthorizationError } = require('./AuthorizationError');
const { customError } = require('./customError');

module.exports = {
  BadRequestError,
  ErrorConflict,
  ErrorNotFound,
  ForbiddenError,
  AuthorizationError,
  customError,
};
