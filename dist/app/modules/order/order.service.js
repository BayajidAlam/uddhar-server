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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const client_1 = require("@prisma/client");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const order_constant_1 = require("./order.constant");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
// get all
const getAll = (userId, filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [{ userId }];
    if (searchTerm) {
        andConditions.push({
            OR: order_constant_1.orderSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.entries(filterData).map(([field, value]) => ({
                [field]: value === 'true' ? true : value === 'false' ? false : value,
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.order.findMany({
        where: whereConditions,
        orderBy: {
            [sortBy]: sortOrder,
        },
        select: {
            id: true,
            total: true,
            subTotal: true,
            shippingCharge: true,
            tax: true,
            orderPlacedAt: true,
            being_delivered: true,
            curier_wareshouse: true,
            delivered_to_curier: true,
            payment_acceptedAt: true,
            orderStatus: true,
            canceledAt: true,
            delivered: true,
            OrderItems: {
                include: {
                    Product: {
                        select: {
                            minPrice: true,
                            productMainImage: true,
                            productName: true,
                        },
                    },
                },
            },
        },
        skip,
        take: limit,
    });
    const total = yield prisma_1.default.order.count({
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
        data: result,
    };
});
// get all orders of a shop
const getAllSellsOrder = (shopId, orderStatus, filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [{ shopId }];
    if (Object.values(client_1.OrderStatus).includes(orderStatus)) {
        andConditions.push({
            orderStatus: orderStatus,
        });
    }
    else {
        andConditions.push({
            orderStatus: {
                notIn: [
                    client_1.OrderStatus.cancel,
                    client_1.OrderStatus.delivered,
                    client_1.OrderStatus.returned,
                ],
            },
        });
    }
    if (searchTerm) {
        andConditions.push({
            OR: order_constant_1.orderSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.entries(filterData).map(([field, value]) => ({
                [field]: value === 'true' ? true : value === 'false' ? false : value,
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.order.findMany({
        where: whereConditions,
        orderBy: {
            [sortBy]: sortOrder,
        },
        select: {
            id: true,
            orderStatus: true,
            fullName: true,
            contactNumber: true,
            address: true,
            orderPlacedAt: true,
            canceledAt: true,
            total: true,
            OrderItems: {
                include: {
                    Product: {
                        select: {
                            minPrice: true,
                            productMainImage: true,
                            productName: true,
                        },
                    },
                },
            },
        },
        skip,
        take: limit,
    });
    const total = yield prisma_1.default.order.count({
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
        data: result,
    };
});
//create
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            id: orderData.userId,
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    // Calculation
    const orderedProducts = orderData.products;
    const subTotal = orderedProducts === null || orderedProducts === void 0 ? void 0 : orderedProducts.reduce((total, item) => total + Number(item.Product.discountPrice) * item.quantity, 0);
    const shipping = 90;
    const taxAmount = 0;
    const total = subTotal + shipping + taxAmount;
    const trnsId = orderData.trnsId;
    const dataForOrder = {
        userId: orderData.userId,
        fullName: orderData.fullName,
        contactNumber: orderData.contactNumber,
        emergencyContactNumber: orderData.emergencyContactNumber,
        email: orderData.email,
        address: orderData.address,
        subTotal: String(subTotal),
        shippingCharge: String(shipping),
        tax: String(taxAmount),
        total: String(total),
        orderStatus: client_1.OrderStatus.placed,
        trnsId,
        paidAmount: parseFloat(String(total)),
        dueAmount: 0,
        isPaid: false,
        shopId: orderData.shopId,
        couponId: orderData.couponId,
    };
    // Use transaction to ensure that all database operations are completed successfully as a single unit
    const result = yield prisma_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        const orderResult = yield prisma.order.create({
            data: dataForOrder,
        });
        const orderItems = yield Promise.all(orderedProducts.map(item => prisma.orderItem.create({
            data: {
                orderId: orderResult.id,
                productId: item.productId,
                quantity: item.quantity,
            },
        })));
        yield Promise.all(orderedProducts.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const product = yield prisma.product.findUnique({
                where: { id: item.productId },
            });
            yield prisma.product.update({
                where: { id: item.productId },
                data: { sellCount: product.sellCount + item.quantity },
            });
        })));
        const paymentInfo = yield prisma.payment.create({
            data: {
                trnxId: trnsId,
                userId: orderData.userId,
                orderId: orderResult.id,
            },
        });
        const updateOrder = yield prisma.order.update({
            where: {
                id: orderResult.id,
            },
            data: {
                isPaid: true,
                payment_acceptedAt: new Date(),
            },
        });
        yield prisma.cart.deleteMany({
            where: {
                userId: orderData.userId,
            },
        });
        return { orderResult, orderItems, paymentInfo, updateOrder };
    }));
    if (result && result.orderResult && result.paymentInfo) {
        return {
            transId: result.paymentInfo.trnxId,
            orderId: result.orderResult.id,
        };
    }
    else {
        throw new Error('Transaction failed');
    }
});
// get single
const getSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findUnique({
        where: {
            id,
        },
    });
    return result;
});
// update single
const updateSingle = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check is exist
    const isExist = yield prisma_1.default.order.findUnique({
        where: {
            id,
        },
        select: {
            orderStatus: true,
            delivered: true,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Order Not Found');
    }
    if (isExist.orderStatus === client_1.OrderStatus.delivered) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Can not cancel order, product delivered');
    }
    const result = yield prisma_1.default.order.update({
        where: {
            id,
        },
        data: payload,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to Update Order');
    }
    return result;
});
exports.OrderService = {
    getSingle,
    getAll,
    getAllSellsOrder,
    createOrder,
    updateSingle,
};
