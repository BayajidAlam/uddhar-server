"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartValidation = void 0;
const zod_1 = require("zod");
const createCart = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: 'Title is required',
        }),
        productId: zod_1.z.string({
            required_error: 'ProductId is required',
        }),
        quantity: zod_1.z
            .number({
            required_error: 'Quantity is required',
        })
            .default(1),
    }),
});
const updateCart = zod_1.z.object({
    userId: zod_1.z.string().optional(),
    productId: zod_1.z.string().optional(),
    quantity: zod_1.z.number().optional(),
});
exports.CartValidation = {
    createCart,
    updateCart,
};
