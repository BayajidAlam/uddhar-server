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
exports.CartService = void 0;
const client_1 = require("@prisma/client");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const cart_constant_1 = require("./cart.constant");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// get all users
const getAll = (userId, filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters;
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [{ userId }];
    if (searchTerm) {
        andConditions.push({
            OR: cart_constant_1.CartSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 1 ? { AND: andConditions } : andConditions[0];
    const cartItems = yield prisma_1.default.cart.findMany({
        where: whereConditions,
        include: {
            Product: {
                select: {
                    id: true,
                    minPrice: true,
                    discountPrice: true,
                    productMainImage: true,
                    discountPercentage: true,
                    moneySaved: true,
                    productName: true,
                    Shop: {
                        select: {
                            shopName: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            [sortBy]: sortOrder,
        },
        skip,
        take: limit,
    });
    const total = yield prisma_1.default.cart.count({
        where: whereConditions,
    });
    const totalPage = Math.ceil(total / limit);
    const subTotal = cartItems === null || cartItems === void 0 ? void 0 : cartItems.reduce((total, item) => total + Number(item.Product.discountPrice) * item.quantity, 0);
    const shipping = 90;
    const taxAmount = 0;
    const totalPayAble = subTotal + shipping + taxAmount;
    return {
        meta: {
            page,
            limit,
            total,
            totalPage,
        },
        data: {
            cartItems,
            subTotal,
            shipping,
            taxAmount,
            total: totalPayAble,
        },
    };
});
//create
const createCart = (CartData) => __awaiter(void 0, void 0, void 0, function* () {
    const isCustomer = yield prisma_1.default.user.findUnique({
        where: {
            id: CartData.userId,
        },
    });
    if ((isCustomer === null || isCustomer === void 0 ? void 0 : isCustomer.role) != client_1.UserRole.customer) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'You can not add to cart');
    }
    const isSameProductAddedToCart = yield prisma_1.default.cart.findFirst({
        where: {
            productId: CartData.productId,
            userId: CartData.userId,
        },
    });
    if (isSameProductAddedToCart) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'This product is already added');
    }
    const isProductExist = yield prisma_1.default.product.findUnique({
        where: {
            id: CartData.productId,
        },
    });
    if (!isProductExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Product does not exist');
    }
    const isProductExistOnWishList = yield prisma_1.default.wishList.findFirst({
        where: {
            userId: CartData.userId,
            productId: CartData.productId,
        },
    });
    if (isProductExistOnWishList) {
        const result = yield prisma_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
            const cartItem = yield prisma.cart.create({
                data: {
                    userId: CartData.userId,
                    productId: CartData.productId,
                },
            });
            yield prisma.wishList.delete({
                where: {
                    id: isProductExistOnWishList.id,
                },
            });
            return cartItem;
        }));
        return result;
    }
    else {
        const result = yield prisma_1.default.cart.create({
            data: CartData,
        });
        return result;
    }
});
// get single
const getSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.cart.findUnique({
        where: {
            id,
        },
    });
    return result;
});
//update or increment quantity
const incrementQuantity = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cartItem = yield prisma_1.default.cart.findUnique({
        where: {
            id,
        },
    });
    if (!cartItem) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cart Not Found');
    }
    const updatedCartItem = yield prisma_1.default.cart.update({
        where: {
            id,
        },
        data: {
            quantity: cartItem.quantity + 1,
        },
    });
    if (!updatedCartItem) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to Update Cart');
    }
    return updatedCartItem;
});
// update or decrement quantity
const decrementQuantity = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cartItem = yield prisma_1.default.cart.findUnique({
        where: {
            id,
        },
    });
    if (!cartItem) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cart Not Found');
    }
    if (cartItem.quantity <= 1) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Cannot decrement quantity below 1');
    }
    const updatedCartItem = yield prisma_1.default.cart.update({
        where: {
            id,
        },
        data: {
            quantity: cartItem.quantity - 1,
        },
    });
    if (!updatedCartItem) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to Update Cart');
    }
    return updatedCartItem;
});
// delete single
const deleteSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // check is exist
    const isExist = yield prisma_1.default.cart.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cart Not Found');
    }
    const result = yield prisma_1.default.cart.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.CartService = {
    createCart,
    getAll,
    getSingle,
    incrementQuantity,
    decrementQuantity,
    deleteSingle,
};
