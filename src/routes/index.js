import UserController from "../controllers/UserController";
import PhonebookController from "../controllers/PhonebookController";
import validateUser from "../middlewares";

const routes = (app) => {
    app.get("/api/v1/", (req, res) => {
        res.send("Hello from here");
    })

    app.post("/api/v1/register", UserController.register);
    app.post("/api/v1/login", UserController.login);
    app.post("/api/v1/contact/create", validateUser ,PhonebookController.createContact);
    app.get("/api/v1/contacts", validateUser , PhonebookController.getAllContacts);
    app.get("/api/v1/contact/:contactId", validateUser , PhonebookController.getContact);



}


export default routes;