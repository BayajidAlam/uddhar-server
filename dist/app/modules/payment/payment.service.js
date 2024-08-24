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
exports.PaymentService = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.NEXT_PUBLIC_CLIENT_SECRET);
// get all users
// const getAll = async (
//   shopId: string,
//   filters: IColorFilters,
//   paginationOptions: IPaginationOptions
// ): Promise<IGenericResponse<Color[]>> => {
//   const { searchTerm } = filters;
//   const { page, limit, skip, sortBy, sortOrder } =
//     paginationHelpers.calculatePagination(paginationOptions);
//   const andConditions: Prisma.ColorWhereInput[] = [{ shopId }];
//   if (searchTerm) {
//     andConditions.push({
//       OR: ColorSearchableFields.map(field => ({
//         [field]: {
//           contains: searchTerm,
//           mode: 'insensitive',
//         },
//       })),
//     });
//   }
//   const whereConditions: Prisma.ColorWhereInput =
//     andConditions.length > 1 ? { AND: andConditions } : andConditions[0];
//   const result = await prisma.color.findMany({
//     where: whereConditions,
//     orderBy: {
//       [sortBy]: sortOrder,
//     },
//     skip,
//     take: limit,
//   });
//   const total = await prisma.color.count({
//     where: whereConditions,
//   });
//   const totalPage = Math.ceil(total / limit);
//   return {
//     meta: {
//       page,
//       limit,
//       total,
//       totalPage,
//     },
//     data: result,
//   };
// };
//create payment intent
const createPaymentIntent = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Array.isArray(paymentData) || paymentData.length === 0) {
        console.error('paymentData must be a non-empty array');
        return;
    }
    const subTotal = paymentData === null || paymentData === void 0 ? void 0 : paymentData.reduce((total, item) => total + Number(item.Product.discountPrice) * item.quantity, 0);
    const shipping = 90;
    const taxAmount = 0;
    const total = (subTotal + shipping + taxAmount) * 100;
    const paymentIntent = yield stripe.paymentIntents.create({
        amount: total,
        currency: 'usd',
        automatic_payment_methods: {
            enabled: true,
        },
    });
    return {
        clientSecret: paymentIntent.client_secret,
    };
});
// //create
// const createColor = async (
//   productColorData: ProductSku
// ): Promise<Color | null> => {
//   const result = await prisma.color.create({
//     data: productColorData,
//   });
//   return result;
// };
// get single
// const getSingle = async (id: string): Promise<Color | null> => {
//   const result = await prisma.color.findUnique({
//     where: {
//       id,
//     },
//   });
//   return result;
// };
// update single
// const updateSingle = async (
//   id: string,
//   payload: Partial<Color>
// ): Promise<Color | null> => {
//   // check is exist
//   const isExist = await prisma.color.findUnique({
//     where: {
//       id,
//     },
//   });
//   if (!isExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Color Not Found');
//   }
//   const result = await prisma.color.update({
//     where: {
//       id,
//     },
//     data: payload,
//   });
//   if (!result) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Color');
//   }
//   return result;
// };
// delete single
// const deleteSingle = async (id: string): Promise<Color | null> => {
//   // check is exist
//   const isExist = await prisma.color.findUnique({
//     where: {
//       id,
//     },
//   });
//   if (!isExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Color Not Found');
//   }
//   const result = await prisma.color.delete({
//     where: {
//       id,
//     },
//   });
//   return result;
// };
exports.PaymentService = {
    createPaymentIntent,
    // createColor,
    // getAll,
    // getSingle,
    // updateSingle,
    // deleteSingle,
};
