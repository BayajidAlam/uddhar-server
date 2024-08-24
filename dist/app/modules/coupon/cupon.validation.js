"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponValidation = void 0;
const zod_1 = require("zod");
const createCoupon = zod_1.z.object({
    body: zod_1.z.object({
        shopId: zod_1.z.string({
            required_error: 'Shop ID is required',
        }),
        couponName: zod_1.z.string({
            required_error: 'Coupon name is required',
        }),
        discount: zod_1.z.string({
            required_error: 'Discount name is required',
        }),
        shippingCharge: zod_1.z.string({
            required_error: 'Shipping charge is required',
        }),
        validTill: zod_1.z.string({
            required_error: 'Valid till is required',
        }),
        createdBy: zod_1.z.string({
            required_error: 'Created by is required',
        }),
    }),
});
const updateCoupon = zod_1.z.object({
    body: zod_1.z.object({
        shopId: zod_1.z.string().optional(),
        discount: zod_1.z.string().optional(),
        shippingCharge: zod_1.z.string().optional(),
        validTill: zod_1.z.string().optional(),
        createdBy: zod_1.z.string().optional(),
    }),
});
exports.CouponValidation = {
    createCoupon,
    updateCoupon,
};
