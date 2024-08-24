"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LostAndFindValidation = void 0;
const zod_1 = require("zod");
// Validation schema for PostMaker model
const postMakerSchema = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(),
    name: zod_1.z.string({
        required_error: 'Name is required',
    }),
    email: zod_1.z
        .string({
        required_error: 'Email is required',
    })
        .email('Invalid email format'),
    contactNumber: zod_1.z.string({
        required_error: 'Contact number is required',
    }),
});
// Validation schema for LostAndFind model
const createLostAndFind = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        age: zod_1.z.number({
            required_error: 'Age is required',
        }),
        description: zod_1.z.string({
            required_error: 'Description is required',
        }),
        clothes: zod_1.z.string({
            required_error: 'Clothes is required',
        }),
        address: zod_1.z.string({
            required_error: 'Address is required',
        }),
        placeWhereLost: zod_1.z.string({
            required_error: 'Place where lost is required',
        }),
        imageUrl: zod_1.z.string({
            required_error: 'Image URL is required',
        }),
        timeWhenLost: zod_1.z.string({
            required_error: 'Time when lost is required',
        }),
        postedBy: postMakerSchema,
    }),
});
// Validation schema for updating LostAndFind model
const updateLostAndFind = zod_1.z.object({
    body: zod_1.z.object({
        isFound: zod_1.z.boolean(),
    }),
});
exports.LostAndFindValidation = {
    createLostAndFind,
    updateLostAndFind,
};
