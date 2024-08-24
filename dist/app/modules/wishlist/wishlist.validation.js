"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistValidation = void 0;
const zod_1 = require("zod");
const createWishlist = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: 'Title is required',
        }),
        productId: zod_1.z.string({
            required_error: 'ProductId is required',
        }),
    }),
});
exports.WishlistValidation = {
    createWishlist,
};
