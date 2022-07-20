const { JsonWebTokenError } = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorhandler");

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

//wrong Mongodb ID Error
if(err.name === "CastError"){
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message,400);
}

//mongoose duplicate key error
if(err.code === 11000){
    const message = `Dsuplicate ${object.keys(err.keyvalue)} Entered`;
    err = new ErrorHandler(message, 400);
}

//wrong JWt error
if(err.name === "JsonWebTokenError"){
    const message = `Json webtoken is invalid, try again`;
    err = new ErrorHandler(message, 400);
}

// JWt expire error
if(err.name === "TokenExpiredError"){
    const message = `Json webtoken is Expired, try again`;
    err = new ErrorHandler(message, 400);
}


    res.status(err.statusCode).json({
        success:false,
       // error:err.stack,//we can ignore the error location
        message : err.message,
    });
}