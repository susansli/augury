import  ApiError  from "../errors/ApiError";
import {SEVERITY} from "../errors/ApiError";
import ClientError from "../errors/ClientError";

    export function errorController(err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // mongodb id error
    if (err.name === "CastError") {
        const message = `Resource Not Found. Invalid: ${err.path}`;
        err = new ClientError(message, 500);
    }

    // mongoose duplicate key error
    if (err.code === 11000) {
        const message = `${Object.keys(err.keyValue)} already exists`;
        err = new ClientError(message, 500);
    }

    // wrong jwt error
    if (err.code === "JsonWebTokenError") {
        const message = 'JWT Error';
        err = new ClientError(message, 500);
    }
    if (err.statusCode === 404) {
        const message = '404 not found'
        err = new ApiError(message, 404, SEVERITY.LOW)
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    }).next(err);
}
