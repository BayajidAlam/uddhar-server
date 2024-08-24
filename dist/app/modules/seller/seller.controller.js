"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const seller_service_1 = require("./seller.service");
// get all
// const getAll = catchAsync(async (req: Request, res: Response) => {
//   const filters = pick(req.query, helperFilterableFields);
//   const paginationOptions = pick(req.query, paginationFields);
//   const result = await SellerService.getAll(filters, paginationOptions);
//   sendResponse<Helper[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Helpers retrieved successfully',
//     meta: result.meta,
//     data: result.data,
//   });
// });
// get single
const getSingle = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield seller_service_1.SellerService.getSingle(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Seller retrieved successfully',
        data: result,
    });
}));
// // update single
// const updateSingle = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const data = req.body;
//   const result = await HelperService.updateSingle(id, data);
//   sendResponse<Helper>(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Helper Updated Successfully',
//     data: result,
//   });
// });
// // inactive
// const inactive = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const result = await HelperService.inactive(id);
//   sendResponse<Helper>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Helper Inactive successfully',
//     data: result,
//   });
// });
exports.SellerController = {
    getSingle,
};
