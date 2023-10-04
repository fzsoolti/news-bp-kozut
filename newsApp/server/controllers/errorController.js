const AppError = require("../utils/appError");

//HANDLE TYPE OF ERRORS (WORKS ON PROD ENV)
const handleCastErrorDB = (err) => {
    const message = `❌ Érvénytelen ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
  };
  
  const handleDuplicateFieldsDB = (err) => {
    const value = err.message.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
    const message = `❌ Dublikált mezők: ${value}.`;
    return new AppError(message, 400);
  };
  
  const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map(el => el.message);
  
    const message = `Érvénytelen adatok!😢 ${errors.join('. ')}`;
    return new AppError(message, 400);
  };

  const handleMulterError = (err) =>{
    const message = `❌ Hiba a fájl feltöltése során: ${err.message}.`;
    return new AppError(message,400);
  }
  
  //SEND ERROR
  const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  };
  
  const sendErrorProd = (err, res) => {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      console.error("ERROR ", err);
  
      res.status(500).json({
        status: "error",
        message: "Valami hiba történt.😢",
      });
    }
  };

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
  
    if (process.env.NODE_ENV === "development") {
      sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === "production") {
      if (err.name === "CastError") err = handleCastErrorDB(err);
      if (err.code === 11000) err = handleDuplicateFieldsDB(err);
      if (err.name === "ValidationError") err = handleValidationErrorDB(err);
      if (err.name === "MulterError") err = handleMulterError(err);
  
      sendErrorProd(err, res);
    }
  };