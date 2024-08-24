"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopValidation = void 0;
const zod_1 = require("zod");
const createShop = zod_1.z.object({
    body: zod_1.z.object({
        sellerId: zod_1.z.string({ required_error: 'Seller ID is Required' }),
        shopName: zod_1.z.string({ required_error: 'Shop Name is Required' }),
        shopImage: zod_1.z.string({ required_error: 'Shop Image is Required' }),
        rating: zod_1.z.string({ required_error: 'Rating is Required' }).default('0'),
        location: zod_1.z.string({ required_error: 'Location is Required' }),
        isVerified: zod_1.z.boolean().optional(),
    }),
});
const updateShop = zod_1.z.object({
    body: zod_1.z.object({
        sellerId: zod_1.z.string().optional(),
        shopName: zod_1.z.string().optional(),
        shopImage: zod_1.z.string().optional(),
        rating: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        isVerified: zod_1.z.boolean().optional(),
    }),
});
exports.ShopValidation = {
    createShop,
    updateShop,
};
