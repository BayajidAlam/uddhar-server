"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsValidation = void 0;
const zod_1 = require("zod");
const createPayment = zod_1.z.object({
    body: zod_1.z.object({
        trnxId: zod_1.z.string({
            required_error: 'Transaction ID is required',
        }),
        userId: zod_1.z.string({
            required_error: 'User ID is required',
        }),
        orderId: zod_1.z.string({
            required_error: 'Order ID is required',
        }),
    }),
});
const updatePayment = zod_1.z.object({
    body: zod_1.z.object({
        trnxId: zod_1.z.string().optional(),
        userId: zod_1.z.string().optional(),
        orderId: zod_1.z.string().optional(),
    }),
});
exports.PaymentsValidation = {
    createPayment,
    updatePayment,
};
