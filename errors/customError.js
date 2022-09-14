const { BadRequestError } = require('./BadRequestError');
const { ErrorConflict } = require('./ErrorConflict');

const customError = (err, req, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    next(new BadRequestError('Неверный запрос или данные'));
    return;
  }
  if (err.code === 11000) {
    next(new ErrorConflict('Пользователь с таким email уже существует'));
    return;
  }
  next(err);
};

module.exports = { customError };
