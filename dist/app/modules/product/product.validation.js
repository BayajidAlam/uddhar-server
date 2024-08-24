"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const zod_1 = require("zod");
const createProductValidation = zod_1.z.object({
    body: zod_1.z.object({
        shopId: zod_1.z.string({
            required_error: 'Shop ID is required',
        }),
        productName: zod_1.z.string({
            required_error: 'Product name is required',
        }),
        productMainImage: zod_1.z.string({
            required_error: 'Product main image is required',
        }),
        productAdditionalImages: zod_1.z.array(zod_1.z.string()),
        productDetails: zod_1.z.string({
            required_error: 'Product details are required',
        }),
        productAdditionalInfo: zod_1.z.any(),
        minPrice: zod_1.z.string({
            required_error: 'Minimum price is required',
        }),
        discountPrice: zod_1.z.string().optional(),
        productSkuId: zod_1.z.string({
            required_error: 'Product SKU ID is required',
        }),
        categoryId: zod_1.z.string({
            required_error: 'Category ID is required',
        }),
        productTagsId: zod_1.z.array(zod_1.z.string()).nonempty().optional(),
    }),
});
const updateProductValidation = zod_1.z.object({
    body: zod_1.z.object({
        shopId: zod_1.z.string().optional(),
        productName: zod_1.z.string().optional(),
        productMainImage: zod_1.z.string().optional(),
        productAdditionalImages: zod_1.z.array(zod_1.z.string()).optional(),
        productDetails: zod_1.z.string().optional(),
        productAdditionalInfo: zod_1.z.any().optional(),
        minPrice: zod_1.z.string().optional(),
        discountPrice: zod_1.z.string().optional(),
        productSkuId: zod_1.z.string().optional(),
        categoryId: zod_1.z.string().optional(),
        productTagsId: zod_1.z.array(zod_1.z.string()).nonempty().optional(),
    }).partial(),
});
exports.ProductValidation = {
    createProductValidation,
    updateProductValidation
};
