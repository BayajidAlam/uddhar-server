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
exports.LostAndFindService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const lostAndFind_constant_1 = require("./lostAndFind.constant");
// get all
const getAll = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, isFound } = filters;
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: lostAndFind_constant_1.LostAndFindSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (typeof isFound !== 'undefined') {
        const isFoundBoolean = String(isFound) === 'true';
        andConditions.push({
            isFound: isFoundBoolean,
        });
    }
    const whereConditions = andConditions.length > 1 ? { AND: andConditions } : andConditions[0];
    const result = yield prisma_1.default.lostAndFind.findMany({
        where: whereConditions,
        orderBy: {
            [sortBy]: sortOrder,
        },
        include: {
            postedBy: true,
        },
        skip,
        take: limit,
    });
    const total = yield prisma_1.default.lostAndFind.count({
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
// get all
const getCount = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { isFound } = filters;
    const andConditions = [];
    if (typeof isFound !== 'undefined') {
        const isFoundBoolean = String(isFound) === 'true';
        andConditions.push({
            isFound: isFoundBoolean,
        });
    }
    const whereConditions = andConditions.length > 1 ? { AND: andConditions } : andConditions[0];
    const total = yield prisma_1.default.lostAndFind.count({
        where: whereConditions,
    });
    return {
        total,
    };
});
//crate
const createLostAndFind = (postedBy, lostPersonData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        // Check if a user with the same phone number exists
        let postMaker = yield prisma.postMaker.findUnique({
            where: { contactNumber: postedBy.contactNumber },
        });
        // If the user doesn't exist, create a new user
        if (!postMaker) {
            postMaker = yield prisma.postMaker.create({
                data: postedBy,
            });
        }
        // Create the LostAndFind entry using the postMaker's ID
        const createdLostAndFind = yield prisma.lostAndFind.create({
            data: Object.assign(Object.assign({}, lostPersonData), { postMakerId: postMaker.id }),
            include: {
                postedBy: true,
            },
        });
        return createdLostAndFind;
    }));
    return result;
});
// update single
const updateSingle = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check is exist
    const isExist = yield prisma_1.default.lostAndFind.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Lost Post Not Found');
    }
    const result = yield prisma_1.default.lostAndFind.update({
        where: {
            id,
        },
        include: {
            postedBy: true,
        },
        data: payload,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to Update Status');
    }
    return result;
});
exports.LostAndFindService = {
    createLostAndFind,
    getAll,
    updateSingle,
    getCount
};
