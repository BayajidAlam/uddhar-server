"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const createOrder = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: 'UserId is required',
        }),
        shopId: zod_1.z.string({
            required_error: 'ShopId is required',
        }),
        contactNumber: zod_1.z.string().optional(),
        emergencyContactNumber: zod_1.z.string().optional(),
        email: zod_1.z.string().email({
            message: 'Invalid email format',
        }),
        address: zod_1.z.string().optional(),
        products: zod_1.z.array(zod_1.z.object({})),
    }),
});
const updateOrder = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        shopId: zod_1.z.string().optional(),
        contactNumber: zod_1.z.string().optional(),
        emergencyContactNumber: zod_1.z.string().optional(),
        email: zod_1.z
            .string()
            .email({
            message: 'Invalid email format',
        })
            .optional(),
        address: zod_1.z.string().optional(),
        products: zod_1.z.array(zod_1.z.object({})).optional(),
    }),
});
exports.OrderValidation = {
    createOrder,
    updateOrder,
};
