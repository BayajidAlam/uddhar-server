"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellsManagerValidation = void 0;
const zod_1 = require("zod");
const update = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.string().optional(),
        contactNumber: zod_1.z.string().optional(),
        emergencyContactNumber: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        profileImg: zod_1.z.string().optional(),
        userId: zod_1.z.string().optional(),
        nidNumber: zod_1.z.string().optional(),
        isActive: zod_1.z.boolean().optional(),
        shopId: zod_1.z.string().optional(),
    }),
});
exports.SellsManagerValidation = {
    update,
};
