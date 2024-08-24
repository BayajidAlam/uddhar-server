"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
// get all users
router.get('/', 
// auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
user_controller_1.UserController.getAllUsers);
// create super admin
router.post('/create-super-admin', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
// ),
(0, validateRequest_1.default)(user_validation_1.UserValidation.createSuperAdmin), user_controller_1.UserController.createSuperAdmin);
// create admin
router.post('/create-admin', 
// auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
(0, validateRequest_1.default)(user_validation_1.UserValidation.createAdmin), user_controller_1.UserController.createAdmin);
// create seller
router.post('/create-seller', 
// auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
(0, validateRequest_1.default)(user_validation_1.UserValidation.createSeller), user_controller_1.UserController.createSeller);
//create sells manager
router.post('/create-sells-manager', 
// auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
(0, validateRequest_1.default)(user_validation_1.UserValidation.createSellsManager), user_controller_1.UserController.createSellsManager);
//create customer
router.post('/create-customer', 
// auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
(0, validateRequest_1.default)(user_validation_1.UserValidation.createCustomer), user_controller_1.UserController.createCustomer);
// get single
router.get('/:id', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
// ),
user_controller_1.UserController.getSingle);
exports.UserRoutes = router;
