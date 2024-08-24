"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSkuValidation = void 0;
const zod_1 = require("zod");
const createProductSku = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        availableColor: zod_1.z.array(zod_1.z.string()).nonempty({
            message: 'At least one color is required',
        }),
        availableSize: zod_1.z.array(zod_1.z.string()).nonempty({
            message: 'At least one size is required',
        }),
        quantity: zod_1.z.string({
            required_error: 'Quantity is required',
        }),
        shopId: zod_1.z.string({
            required_error: 'ShopId is required',
        }),
    }),
});
const updateProductSku = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        availableColor: zod_1.z.array(zod_1.z.string()).optional(),
        availableSize: zod_1.z.array(zod_1.z.string()).optional(),
        quantity: zod_1.z.string().optional(),
        shopId: zod_1.z.string().optional(),
    }),
});
exports.ProductSkuValidation = {
    createProductSku,
    updateProductSku,
};
