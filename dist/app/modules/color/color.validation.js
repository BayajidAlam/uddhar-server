"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorsValidation = void 0;
const zod_1 = require("zod");
const createColor = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        shopId: zod_1.z.string({
            required_error: 'ShopId is required',
        }),
    }),
});
const updateColor = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        shopId: zod_1.z.string().optional(),
    }),
});
exports.ColorsValidation = {
    createColor,
    updateColor,
};
