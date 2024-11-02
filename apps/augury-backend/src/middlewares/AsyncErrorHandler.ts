/**
 * Error handler function for async methods to catch failed promises.
 *
 * To use; wrap your handler within this function and pass it to the route.
 * e.g. `router.route(baseURL).get(asyncErrorHandler(Controller.get))`
 * @param func Handler to wrap
 * @returns Async request handler function that catches errors
 */
export default function asyncErrorHandler(func) {
  return (req, res, next) => {
    func(req, res, next).catch((err) => (console.log(err), next(err)));
  };
}
