"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createSuperAdmin = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is Required' }),
        password: zod_1.z.string({ required_error: 'Password is Required' }),
        superAdmin: zod_1.z.object({
            fullName: zod_1.z.string({ required_error: 'Full Name is Required' }),
            contactNumber: zod_1.z.string({ required_error: 'Contact Number is Required' }),
            emergencyContactNumber: zod_1.z.string({
                required_error: 'Emergency Contact Number is Required',
            }),
            address: zod_1.z.string({
                required_error: 'Address is Required',
            }),
            profileImg: zod_1.z.string({
                required_error: 'profile Image is Required',
            }),
            nidNumber: zod_1.z.string({
                required_error: 'Nid Number is Required',
            }),
            isActive: zod_1.z.boolean({}),
        }),
    }),
});
const createAdmin = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is Required' }),
        password: zod_1.z.string({ required_error: 'Password is Required' }),
        admin: zod_1.z.object({
            fullName: zod_1.z.string({ required_error: 'Full Name is Required' }),
            contactNumber: zod_1.z.string({ required_error: 'Contact Number is Required' }),
            emergencyContactNumber: zod_1.z
                .string({ required_error: 'Emergency Contact Number is Required' })
                .optional(),
            address: zod_1.z.string().optional(),
            profileImg: zod_1.z.string().optional(),
            nidNumber: zod_1.z
                .string({ required_error: 'Nid Number is Required' })
                .optional(),
            isActive: zod_1.z.boolean().optional(),
        }),
    }),
});
const createSeller = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is Required' }),
        password: zod_1.z.string({ required_error: 'Password is Required' }),
        seller: zod_1.z.object({
            fullName: zod_1.z.string({ required_error: 'Full Name is Required' }),
            contactNumber: zod_1.z.string({ required_error: 'Contact Number is Required' }),
            emergencyContactNumber: zod_1.z
                .string({ required_error: 'Emergency Contact Number is Required' })
                .optional(),
            address: zod_1.z.string({
                required_error: 'Address is Required',
            }),
            profileImg: zod_1.z.string({
                required_error: 'Profile Image is Required',
            }),
            nidNumber: zod_1.z.string({ required_error: 'Nid Number is Required' }),
            isActive: zod_1.z.boolean(),
        }),
    }),
});
const createSellsManager = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is Required' }),
        password: zod_1.z.string({ required_error: 'Password is Required' }),
        sellsManager: zod_1.z.object({
            fullName: zod_1.z.string({ required_error: 'Full Name is Required' }),
            contactNumber: zod_1.z.string({ required_error: 'Contact Number is Required' }),
            emergencyContactNumber: zod_1.z
                .string({ required_error: 'Emergency Contact Number is Required' })
                .optional(),
            address: zod_1.z
                .string({
                required_error: 'Address is Required',
            })
                .optional(),
            profileImg: zod_1.z
                .string({
                required_error: 'Profile Image is Required',
            })
                .optional(),
            nidNumber: zod_1.z.string({ required_error: 'Nid Number is Required' }),
            isActive: zod_1.z.boolean().optional(),
            shopId: zod_1.z.string(),
        }),
    }),
});
const createCustomer = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is Required' }),
        password: zod_1.z.string({ required_error: 'Password is Required' }),
        customer: zod_1.z.object({
            fullName: zod_1.z.string({ required_error: 'Full Name is Required!' }),
            contactNumber: zod_1.z
                .string()
                .optional()
                .refine(val => val == null || /^\+?[1-9]\d{1,14}$/.test(val), {
                message: 'Invalid contact number format',
            }),
            emergencyContactNumber: zod_1.z
                .string()
                .optional()
                .refine(val => val == null || /^\+?[1-9]\d{1,14}$/.test(val), {
                message: 'Invalid emergency contact number format',
            }),
            address: zod_1.z.string().optional(),
            profileImg: zod_1.z.string().optional(),
            isActive: zod_1.z.boolean().default(true),
            dob: zod_1.z.string().optional(),
        }),
    }),
});
exports.UserValidation = {
    createSuperAdmin,
    createAdmin,
    createSeller,
    createSellsManager,
    createCustomer,
};
