"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponRoutes = void 0;
const express_1 = __importDefault(require("express"));
const cupon_controller_1 = require("./cupon.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const cupon_validation_1 = require("./cupon.validation");
const router = express_1.default.Router();
// get all
router.get('/', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.DRIVER,
//   ENUM_USER_ROLE.HELPER
// ),
cupon_controller_1.CouponController.getAll);
// create shop
router.post('/create-coupon', 
// auth(
//   ENUM_Shop_ROLE.SUPER_ADMIN,
//   ENUM_Shop_ROLE.ADMIN,
// ),
(0, validateRequest_1.default)(cupon_validation_1.CouponValidation.createCoupon), cupon_controller_1.CouponController.createCoupon);
// get single
router.get('/title/:couponName', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
// ),
cupon_controller_1.CouponController.getCouponByTitle);
// get single
router.get('/:id', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
// ),
cupon_controller_1.CouponController.getSingle);
// update single
router.patch('/:id', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.DRIVER,
//   ENUM_USER_ROLE.HELPER
// ),
(0, validateRequest_1.default)(cupon_validation_1.CouponValidation.updateCoupon), cupon_controller_1.CouponController.updateSingle);
// delete single
router.delete('/:id', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.DRIVER,
//   ENUM_USER_ROLE.HELPER
// ),
cupon_controller_1.CouponController.deleteSingle);
exports.CouponRoutes = router;
