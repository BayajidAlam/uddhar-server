"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTagsValidation = void 0;
const zod_1 = require("zod");
const createProductTagsValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
    }),
});
const updateProductTagsValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
    }),
});
exports.ProductTagsValidation = {
    createProductTagsValidation,
    updateProductTagsValidation,
};
