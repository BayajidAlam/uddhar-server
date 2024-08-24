"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTagsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const ProductTags_controller_1 = require("./ProductTags.controller");
const ProductTags_validation_1 = require("./ProductTags.validation");
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
ProductTags_controller_1.ProductTagsController.getAll);
// create
router.post('/create-product-tags', 
// auth(
//   ENUM_Shop_ROLE.SUPER_ADMIN,
//   ENUM_Shop_ROLE.ADMIN,
// ),
(0, validateRequest_1.default)(ProductTags_validation_1.ProductTagsValidation.createProductTagsValidation), ProductTags_controller_1.ProductTagsController.createProductTags);
// get single
router.get('/:id', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
// ),
ProductTags_controller_1.ProductTagsController.getSingle);
// update single
router.patch('/:id', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.DRIVER,
//   ENUM_USER_ROLE.HELPER
// ),
(0, validateRequest_1.default)(ProductTags_validation_1.ProductTagsValidation.updateProductTagsValidation), ProductTags_controller_1.ProductTagsController.updateSingle);
// delete single
router.delete('/:id', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.DRIVER,
//   ENUM_USER_ROLE.HELPER
// ),
ProductTags_controller_1.ProductTagsController.deleteSingle);
exports.ProductTagsRoutes = router;
