import Response from "../helpers/response";
import JWTService from "../services/JWTService";
import UserService from "../services/UserService";

async function validateUser(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return Response.errorResponse(res, 'Token is not provided', 400);
    }
    try {
      const decoded = await JWTService.verifyToken(token);
      const data = await UserService.find({ id: decoded.id });
      if (!data) {
        return Response.errorResponse(res, 'User does not exist', 404);
      }
      delete data.dataValues.password;
      req.user = data.dataValues;
      return next();
    } catch (error) {
      return Response.errorResponse(res, "Something went wrong", 401);
    }
  }


  export default validateUser;