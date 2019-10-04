import UserController from "../controllers/UserController";

const routes = (app) => {
    app.get("/api/v1/", (req, res) => {
        res.send("Hello from here");
    })

    app.post("/api/v1/register", UserController.register);
    app.post("/api/v1/login", UserController.login);

}


export default routes;