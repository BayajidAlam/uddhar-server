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
exports.PaymentController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const payment_service_1 = require("./payment.service");
// get all
// const getAll = catchAsync(async (req: Request, res: Response) => {
//   const { shopId, ...colorData } = req.query;
//   const filters = pick(colorData, ColorFilterableFields);
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
//create
const createPaymentIntent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentData = req.body;
    const result = yield payment_service_1.PaymentService.createPaymentIntent(paymentData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'payment intent created Successfully',
        data: result,
    });
}));
//create
// const createColor = catchAsync(async (req: Request, res: Response) => {
//   const ProductColorData = req.body;
//   const result = await ProductColorService.createColor(ProductColorData);
//   sendResponse<Color>(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Color created Successfully',
//     data: result,
//   });
// });
// get single
// const getSingle = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const result = await ProductColorService.getSingle(id);
//   sendResponse<Color>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Color retrieved successfully',
//     data: result,
//   });
// });
// update single
// const updateSingle = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const data = req.body;
//   const result = await ProductColorService.updateSingle(id, data);
//   sendResponse<Color>(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Color Updated Successfully',
//     data: result,
//   });
// });
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
exports.PaymentController = {
    // getAll,
    createPaymentIntent,
    // createColor,
    // getSingle,
    // updateSingle,
    // deleteSingle,
};
