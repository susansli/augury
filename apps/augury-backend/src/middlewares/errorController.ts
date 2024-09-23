import ApiError from "../errors/ApiError";
import ClientError from "../errors/ClientError";

export function errorController(err, req, res, next) {
  if (err instanceof(ApiError)) {
    console.error(err.stack)
    res.status(500).send(err.statusCode)
  }else if(err instanceof(ClientError)){
    res.status(400).send(err.statusCode)}
}
