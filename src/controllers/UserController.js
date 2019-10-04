import UserService from "../services/UserService";
import Response from "../helpers/response";
import JWTService from "../services/JWTService";


class UserController {
    static async register(req, res){
        const { body } = req;
        const user = await UserService.create(body);
        
        const { id, username } = user.get({ plain: true });
        const token = JWTService.sign({ id, username });
        res.header('X-Auth-Token', token);
        Response.successResponse(res, user,  "User created successfully",  201);
    }

    static async login(req, res){
        const { email , password } = req.body;
        const user = await UserService.getByEmailOrUsername(email);
        if (!user || !user.comparePassword(password)) {
            return Response.errorResponse(res, "invalid credentials", 422);
        }
        const token = JWTService.sign({ id: user.id, username: user.username });
        Response.send(res, { token }, "login successful", 200);
    }
}

export default UserController;