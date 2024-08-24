"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = require("./shared/logger");
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const notFoundHandler_1 = __importDefault(require("./app/middlewares/notFoundHandler"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = require("http");
// import router
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
// request log
app.use(logger_1.requestLog);
// static public folder
app.use(express_1.default.static(path_1.default.join(process.cwd(), 'public')));
// using cors
// app.use(cors(corsOptions));
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));
app.use((0, cookie_parser_1.default)());
// using parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// application route
app.use('/api/v1', routes_1.default);
// handle global error
app.use(globalErrorHandler_1.default);
// handle not found route
app.use(notFoundHandler_1.default);
exports.default = server;
