"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const seller_controller_1 = require("./seller.controller");
const router = express_1.default.Router();
// // get all
// router.get(
//   '/',
//   auth(
//     ENUM_USER_ROLE.SUPER_ADMIN,
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.DRIVER,
//     ENUM_USER_ROLE.HELPER
//   ),
//   HelperController.getAll
// );
// get single
router.get('/:id', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
// ),
seller_controller_1.SellerController.getSingle);
// // update single
// router.patch(
//   '/:id',
//   auth(
//     ENUM_USER_ROLE.SUPER_ADMIN,
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.DRIVER,
//     ENUM_USER_ROLE.HELPER
//   ),
//   validateRequest(HelperValidation.update),
//   HelperController.updateSingle
// );
// // inactive
// router.patch(
//   '/:id/inactive',
//   auth(
//     ENUM_USER_ROLE.SUPER_ADMIN,
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.DRIVER,
//     ENUM_USER_ROLE.HELPER
//   ),
//   HelperController.inactive
// );
exports.SellerRoutes = router;
