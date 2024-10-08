"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lostAndFind_route_1 = require("../modules/lostAndFind/lostAndFind.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/lost-and-found',
        route: lostAndFind_route_1.LostAndFindRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
