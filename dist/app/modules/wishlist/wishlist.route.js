"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const wishlist_controller_1 = require("./wishlist.controller");
const wishlist_validation_1 = require("./wishlist.validation");
;
const router = express_1.default.Router();
// get all
router.get('/', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.DRIVER,
//   ENUM_USER_ROLE.HELPER
// ),
wishlist_controller_1.WishlistController.getAll);
// create
router.post('/add-to-wishlist', 
// auth(
//   ENUM_Shop_ROLE.SUPER_ADMIN,
//   ENUM_Shop_ROLE.ADMIN,
// ),
(0, validateRequest_1.default)(wishlist_validation_1.WishlistValidation.createWishlist), wishlist_controller_1.WishlistController.createWishlist);
// delete single
router.delete('/:id', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.DRIVER,
//   ENUM_USER_ROLE.HELPER
// ),
wishlist_controller_1.WishlistController.deleteSingle);
exports.WishlistRoutes = router;
