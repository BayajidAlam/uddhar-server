import express, { Application } from 'express';
import cors from 'cors';
import { requestLog } from './shared/logger';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundHandler from './app/middlewares/notFoundHandler';
import path from 'path';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';

// import router
import routes from './app/routes';
const app: Application = express();
const server = createServer(app);

// request log
app.use(requestLog);
// static public folder
app.use(express.static(path.join(process.cwd(), 'public')));
// using cors
// app.use(cors(corsOptions));

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  })
);

app.use(cookieParser());
// using parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// application route
app.use('/api/v1', routes);
// handle global error
app.use(globalErrorHandler);
// handle not found route
app.use(notFoundHandler);

export default server;
