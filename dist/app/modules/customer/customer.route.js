"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const customer_controller_1 = require("./customer.controller");
const customer_validation_1 = require("./customer.validation");
// import auth from '../../middlewares/auth';
// import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express_1.default.Router();
// get all
// router.get(
//   '/',
//   // auth(
//   //   ENUM_USER_ROLE.SUPER_ADMIN,
//   //   ENUM_USER_ROLE.ADMIN,
//   //   ENUM_USER_ROLE.DRIVER,
//   //   ENUM_USER_ROLE.HELPER
//   // ),
//   ColorsController.getAll
// );
// get single
router.get('/:id', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
// ),
customer_controller_1.CustomerController.getSingle);
// update single
router.patch('/:id', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.DRIVER,
//   ENUM_USER_ROLE.HELPER
// ),
(0, validateRequest_1.default)(customer_validation_1.CustomerValidation.updateCustomer), customer_controller_1.CustomerController.updateSingle);
// delete single
// router.delete(
//   '/:id',
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.DRIVER,
//   ENUM_USER_ROLE.HELPER
// ),
//   ColorsController.deleteSingle
// );
exports.CustomersRoutes = router;
