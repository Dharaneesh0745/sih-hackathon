const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  // err.statusCode = err.statusCode || 500;
  // err.message = err.message || "Internal server Error";

  if (!(err instanceof ErrorHandler)) {
    err = new ErrorHandler(err.message, err.statusCode || 500);
  }

  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resources not found with this database id.. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Your token is invalid, please try again!`;
    err = new ErrorHandler(message, 400);
  }

  // jwt expired
  if (err.name === "TokenExpiredError") {
    const message = `Your token has been expired, please try again!`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
