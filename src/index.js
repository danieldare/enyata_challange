import express from "express";
import routes from "./routes";
import logger from "morgan";
import createError from "http-errors";
import debuger from "debug";
import dotenv from "dotenv";


dotenv.config();

const debug = debuger("Food:api");

const app  = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

routes(app);

// catch 404 and forward to exception handler
app.use((req, res, next) => next(createError(404,`Not Found. Use /api/v1} to access the api resource`)));


const port = process.env.PORT || 4400;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})