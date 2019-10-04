import UserService from "../services/UserService";
import Response from "../helpers/response";
import JWTService from "../services/JWTService";


class UserController {
    /**
   * Creates a user account.
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof UserController
   */
    static async register(req, res){
        const { body } = req;
        const user = await UserService.create(body);
        
        const { id, username } = user.get({ plain: true });
        const token = JWTService.sign({ id, username });
        res.header('authorization', token);
        Response.successResponse(res, user,  "User created successfully",  201);
    }

    
     /**
   * Login fuunctionality.
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof UserController
   */
    static async login(req, res){
        const { email , password } = req.body;
        const user = await UserService.getByEmailOrUsername(email);
        if (!user || !user.comparePassword(password)) {
            return Response.errorResponse(res, "invalid credentials", 422);
        }
        const token = JWTService.sign({ id: user.id, username: user.username });
        Response.successResponse(res, { token },  "User created successfully",  200);
    }
}

export default UserController;