"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const shop_controller_1 = require("./shop.controller");
const shop_validation_1 = require("./shop.validation");
const router = express_1.default.Router();
// get all
router.get('/', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.DRIVER,
//   ENUM_USER_ROLE.HELPER
// ),
shop_controller_1.ShopController.getAll);
// create shop
router.post('/create-shop', 
// auth(
//   ENUM_Shop_ROLE.SUPER_ADMIN,
//   ENUM_Shop_ROLE.ADMIN,
// ),
(0, validateRequest_1.default)(shop_validation_1.ShopValidation.createShop), shop_controller_1.ShopController.createShop);
// get single
router.get('/:id', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
// ),
shop_controller_1.ShopController.getSingle);
// update single
router.patch('/:id', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.DRIVER,
//   ENUM_USER_ROLE.HELPER
// ),
(0, validateRequest_1.default)(shop_validation_1.ShopValidation.updateShop), shop_controller_1.ShopController.updateSingle);
// delete single
router.delete('/:id', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.DRIVER,
//   ENUM_USER_ROLE.HELPER
// ),
shop_controller_1.ShopController.deleteSingle);
exports.ShopRoutes = router;
