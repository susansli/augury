/* error handler function for async methods to catch
failed promises.*/

module.exports = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch(err => next(err));
    }
}

