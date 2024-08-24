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
exports.SellerService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// get all
// const getAll = async (
//   filters: IHelperFilters,
//   paginationOptions: IPaginationOptions
// ): Promise<IGenericResponse<Helper[]>> => {
//   const { searchTerm, ...filterData } = filters;
//   const { page, limit, skip, sortBy, sortOrder } =
//     paginationHelpers.calculatePagination(paginationOptions);
//   const andConditions = [];
//   if (searchTerm) {
//     andConditions.push({
//       OR: helperSearchableFields.map(field => ({
//         [field]: {
//           contains: searchTerm,
//           mode: 'insensitive',
//         },
//       })),
//     });
//   }
//   if (Object.keys(filterData).length > 0) {
//     andConditions.push({
//       AND: Object.entries(filterData).map(([field, value]) => ({
//         [field]: value === 'true' ? true : value === 'false' ? false : value,
//       })),
//     });
//   }
//   const whereConditions: Prisma.HelperWhereInput =
//     andConditions.length > 0 ? { AND: andConditions } : {};
//   const result = await prisma.helper.findMany({
//     where: whereConditions,
//     orderBy: {
//       [sortBy]: sortOrder,
//     },
//     skip,
//     take: limit,
//   });
//   const total = await prisma.helper.count({
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
    const result = yield prisma_1.default.seller.findUnique({
        where: {
            userId: id,
        },
    });
    return result;
});
// // update single
// const updateSingle = async (
//   id: string,
//   payload: Partial<Helper>
// ): Promise<Helper | null> => {
//   // check is exist
//   const isExist = await prisma.helper.findUnique({
//     where: {
//       id,
//     },
//   });
//   if (!isExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Helper Not Found');
//   }
//   const result = await prisma.helper.update({
//     where: {
//       id,
//     },
//     data: payload,
//   });
//   if (!result) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Helper');
//   }
//   return result;
// };
// // inactive
// const inactive = async (id: string): Promise<Helper | null> => {
//   // check is exist
//   const isExist = await prisma.helper.findUnique({
//     where: {
//       id,
//     },
//   });
//   if (!isExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Helper Not Found');
//   }
//   const result = await prisma.helper.update({
//     where: {
//       id,
//     },
//     data: { isActive: false },
//   });
//   return result;
// };
exports.SellerService = {
    getSingle,
};
