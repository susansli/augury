/* error handler function for async methods to catch
failed promises.*/

export default function asyncErrorHandler(func) {
  return (req, res, next) => {
      func(req, res, next).catch(err => next(err));
  }
}

