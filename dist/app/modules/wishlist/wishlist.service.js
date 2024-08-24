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
exports.WishlistService = void 0;
const client_1 = require("@prisma/client");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const wishlist_constant_1 = require("./wishlist.constant");
// get all users
const getAll = (userId, filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters;
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [{ userId }];
    if (searchTerm) {
        andConditions.push({
            OR: wishlist_constant_1.WishListSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 1 ? { AND: andConditions } : andConditions[0];
    const wishlistItems = yield prisma_1.default.wishList.findMany({
        where: whereConditions,
        include: {
            Product: {
                select: {
                    id: true,
                    productName: true,
                    productMainImage: true,
                    discountPrice: true,
                    moneySaved: true,
                    discountPercentage: true,
                },
            },
        },
        orderBy: {
            [sortBy]: sortOrder,
        },
        skip,
        take: limit,
    });
    const total = yield prisma_1.default.wishList.count({
        where: whereConditions,
    });
    const totalPage = Math.ceil(total / limit);
    return {
        meta: {
            page,
            limit,
            total,
            totalPage,
        },
        data: {
            wishlistItems,
        },
    };
});
//create
const createWishlist = (wishlistData) => __awaiter(void 0, void 0, void 0, function* () {
    const isCustomer = yield prisma_1.default.user.findUnique({
        where: {
            id: wishlistData.userId,
        },
    });
    if ((isCustomer === null || isCustomer === void 0 ? void 0 : isCustomer.role) != client_1.UserRole.customer) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'You can not add to wishlist');
    }
    const isSameProductAddedToWishlist = yield prisma_1.default.wishList.findFirst({
        where: {
            productId: wishlistData.productId,
            userId: wishlistData.userId,
        },
    });
    if (isSameProductAddedToWishlist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'This product is already added');
    }
    const result = yield prisma_1.default.wishList.create({
        data: wishlistData,
    });
    return result;
});
// delete single
const deleteSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // check is exist
    const isExist = yield prisma_1.default.wishList.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Wishlist Not Found');
    }
    const result = yield prisma_1.default.wishList.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.WishlistService = {
    createWishlist,
    getAll,
    deleteSingle,
};
