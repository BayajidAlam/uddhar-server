"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellsManagerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const sellsManager_controller_1 = require("./sellsManager.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const sellsManager_validation_1 = require("./sellsManager.validation");
const router = express_1.default.Router();
// get all
router.get('/', 
// auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER),
sellsManager_controller_1.SellsManagerController.getAll);
// get single
router.get('/:id', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
// ),
sellsManager_controller_1.SellsManagerController.getSingle);
// update single
router.patch('/:id', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.DRIVER,
//   ENUM_USER_ROLE.HELPER
// ),
(0, validateRequest_1.default)(sellsManager_validation_1.SellsManagerValidation.update), sellsManager_controller_1.SellsManagerController.updateSingle);
// delete single
router.delete('/:id', 
// auth(
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.DRIVER,
//   ENUM_USER_ROLE.HELPER
// ),
sellsManager_controller_1.SellsManagerController.deleteSingle);
exports.SellsManagerRoutes = router;
