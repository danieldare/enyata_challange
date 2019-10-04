import UserController from "../controllers/UserController";

const routes = (app) => {
    app.get("/api/v1/", (req, res) => {
        res.send("Hello from here");
    })

    app.get("/api/v1/register", UserController.register)
}


export default routes;