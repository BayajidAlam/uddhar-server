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
exports.CustomerController = void 0;
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const customer_service_1 = require("./customer.service");
// get all
// const getAll = catchAsync(async (req: Request, res: Response) => {
//   const { shopId, ...colorData } = req.query;
//   const filters = pick(colorData, CustomerFilterableFields);
//   const paginationOptions = pick(req.query, paginationFields);
//   const result = await ProductColorService.getAll(
//     shopId as string,
//     filters,
//     paginationOptions
//   );
//   sendResponse<Color[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Color retrieved successfully',
//     meta: result.meta,
//     data: result.data,
//   });
// });
// get single
const getSingle = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield customer_service_1.CustomerService.getSingle(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Customer retrieved successfully',
        data: result,
    });
}));
// update single
const updateSingle = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield customer_service_1.CustomerService.updateSingle(id, data);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Customer Updated Successfully',
        data: result,
    });
}));
// delete
// const deleteSingle = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const result = await ProductColorService.deleteSingle(id);
//   sendResponse<Color>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Color Deleted successfully',
//     data: result,
//   });
// });
exports.CustomerController = {
    getSingle,
    updateSingle,
};
