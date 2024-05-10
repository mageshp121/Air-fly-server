import express from "express";
import connectDb from "./config/db.config.js";
import config from "./config/env.config.js";
import errorHandlingMiddleware from "./middlewares/errorHandlingMiddleware.js";
import morgan from 'morgan'
import cors from 'cors'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from "helmet";
import cookieParser from 'cookie-parser'
import routes from "./routes/routes.js";
import authenticate from "./middlewares/authenticate.js";






const app = express();
const router = express.Router();

// Middleware
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Logging middleware
app.use(
  express.urlencoded({ limit: "1000mb", extended: true, parameterLimit: 50000 })
);
app.use(helmet({ xssFilter: true }))
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*" })); // CORS middleware
app.use(mongoSanitize())
app.use(authenticate()); // Authentication middleware

// Routes
routes(app, router);

// Error handling middleware 
app.use(errorHandlingMiddleware);

// Start server
const start = async () => {
    await connectDb();
    app.listen(config.port, () => {
        console.log(`Server listening on port ${config.port}...✅ `);
    });
};
start();
