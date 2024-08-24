"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const size_controller_1 = require("./size.controller");
const size_validation_1 = require("./size.validation");
// import auth from '../../middlewares/auth';
// import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express_1.default.Router();
// get all
router.get('/', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.DRIVER,
//   ENUM_USER_ROLE.HELPER
// ),
size_controller_1.SizeController.getAll);
// create
router.post('/create-size', 
// auth(
//   ENUM_Shop_ROLE.SUPER_ADMIN,
//   ENUM_Shop_ROLE.ADMIN,
// ),
(0, validateRequest_1.default)(size_validation_1.SizeValidation.createSize), size_controller_1.SizeController.create);
// get single
router.get('/:id', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
// ),
size_controller_1.SizeController.getSingle);
// update single
router.patch('/:id', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.DRIVER,
//   ENUM_USER_ROLE.HELPER
// ),
(0, validateRequest_1.default)(size_validation_1.SizeValidation.updateSize), size_controller_1.SizeController.updateSingle);
// delete single
router.delete('/:id', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.DRIVER,
//   ENUM_USER_ROLE.HELPER
// ),
size_controller_1.SizeController.deleteSingle);
exports.SizeRoutes = router;
