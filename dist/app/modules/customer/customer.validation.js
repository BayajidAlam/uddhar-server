"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerValidation = void 0;
const zod_1 = require("zod");
const createCustomer = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.string({
            required_error: 'Full name is required',
        }),
        contactNumber: zod_1.z.string().optional(),
        emergencyContactNumber: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        profileImg: zod_1.z.string().optional(),
        userId: zod_1.z.string({
            required_error: 'User ID is required',
        }),
        isActive: zod_1.z.boolean().optional(),
        dob: zod_1.z.string().optional(),
    }),
});
const updateCustomer = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.string().optional(),
        contactNumber: zod_1.z.string().optional(),
        emergencyContactNumber: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        profileImg: zod_1.z.string().optional(),
        userId: zod_1.z.string().optional(),
        isActive: zod_1.z.boolean().optional(),
        dob: zod_1.z.string().optional(),
    }),
});
exports.CustomerValidation = {
    createCustomer,
    updateCustomer,
};
