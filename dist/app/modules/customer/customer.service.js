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
exports.CustomerService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
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
// get single
const getSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.customer.findUnique({
        where: {
            userId: id,
        },
    });
    return result;
});
// update single
const updateSingle = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check is exist
    const isExist = yield prisma_1.default.customer.findUnique({
        where: {
            userId: id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Customer Not Found');
    }
    const result = yield prisma_1.default.customer.update({
        where: {
            userId: id,
        },
        data: payload,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to Update Customer');
    }
    return result;
});
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
exports.CustomerService = {
    getSingle,
    updateSingle,
};
