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
exports.UserService = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const user_constant_1 = require("./user.constant");
const config_1 = __importDefault(require("../../../config"));
// get all users
const getAllUsers = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, role } = filters;
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: user_constant_1.userSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (role) {
        andConditions.push({
            role: role,
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.user.findMany({
        where: whereConditions,
        orderBy: {
            [sortBy]: sortOrder,
        },
        skip,
        take: limit,
        include: {
            superAdmin: true,
            admin: true,
            seller: true,
            sellsManager: true,
            customer: true,
        },
    });
    const total = yield prisma_1.default.user.count({
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
const createSuperAdmin = (userData, superAdminData) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(userData.password, Number(config_1.default.bcrypt_salt_rounds));
    userData.role = client_1.UserRole.super_admin;
    const result = yield prisma_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield prisma.user.create({
            data: Object.assign(Object.assign({}, userData), { password: hashedPassword, role: client_1.UserRole.super_admin, superAdmin: {
                    create: Object.assign({}, superAdminData),
                } }),
            include: {
                superAdmin: true,
            },
        });
        return user;
    }));
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to Create');
    }
    return result;
});
// create admin
const createAdmin = (userData, adminData) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(userData.password, Number(config_1.default.bcrypt_salt_rounds));
    userData.role = client_1.UserRole.admin;
    const result = yield prisma_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield prisma.user.create({
            data: Object.assign(Object.assign({}, userData), { password: hashedPassword, role: client_1.UserRole.admin, admin: {
                    create: Object.assign({}, adminData),
                } }),
            include: {
                admin: true,
            },
        });
        return user;
    }));
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to Create');
    }
    return result;
});
// create seller
const createSeller = (userData, sellerData) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(userData.password, Number(config_1.default.bcrypt_salt_rounds));
    userData.role = client_1.UserRole.seller;
    const result = yield prisma_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield prisma.user.create({
            data: Object.assign(Object.assign({}, userData), { password: hashedPassword, role: client_1.UserRole.seller, seller: {
                    create: Object.assign({}, sellerData),
                } }),
            include: {
                seller: true,
            },
        });
        return user;
    }));
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to Create Seller');
    }
    return result;
});
// create sellsManager
const createSellsManager = (userData, sellsManagerData) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(userData.password, Number(config_1.default.bcrypt_salt_rounds));
    userData.role = client_1.UserRole.sells_manager;
    const result = yield prisma_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield prisma.user.create({
            data: Object.assign(Object.assign({}, userData), { password: hashedPassword, role: client_1.UserRole.sells_manager, sellsManager: {
                    create: Object.assign({}, sellsManagerData),
                } }),
            include: {
                sellsManager: true,
            },
        });
        return user;
    }));
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to Create Sells Manager');
    }
    return result;
});
// create sellsManager
const createCustomer = (userData, customerData) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(userData.password, Number(config_1.default.bcrypt_salt_rounds));
    userData.role = client_1.UserRole.customer;
    const result = yield prisma_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield prisma.user.create({
            data: Object.assign(Object.assign({}, userData), { password: hashedPassword, role: client_1.UserRole.customer, customer: {
                    create: Object.assign({}, customerData),
                } }),
            include: {
                customer: true,
            },
        });
        return user;
    }));
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to Create Sells Manager');
    }
    return result;
});
// get single
const getSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: {
            id,
        },
        select: {
            email: true,
            customer: {
                select: {
                    fullName: true,
                    profileImg: true,
                },
            },
        },
    });
    return result;
});
exports.UserService = {
    createSuperAdmin,
    createAdmin,
    createSeller,
    createSellsManager,
    createCustomer,
    getAllUsers,
    getSingle
};
