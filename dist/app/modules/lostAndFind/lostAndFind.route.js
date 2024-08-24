"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LostAndFindRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const lostAndFind_validation_1 = require("./lostAndFind.validation");
const lostAndFind_controller_1 = require("./lostAndFind.controller");
const router = express_1.default.Router();
// get all
router.get('/', lostAndFind_controller_1.LostAndFindController.getAll);
// create
router.post('/create-lost', (0, validateRequest_1.default)(lostAndFind_validation_1.LostAndFindValidation.createLostAndFind), lostAndFind_controller_1.LostAndFindController.createLostAndFind);
// update single
router.patch('/:id', (0, validateRequest_1.default)(lostAndFind_validation_1.LostAndFindValidation.updateLostAndFind), lostAndFind_controller_1.LostAndFindController.updateSingle);
exports.LostAndFindRoutes = router;
