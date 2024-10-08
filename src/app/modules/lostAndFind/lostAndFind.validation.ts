import { z } from 'zod';

// Validation schema for PostMaker model
const postMakerSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string({
    required_error: 'Name is required',
  }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  contactNumber: z.string({
    required_error: 'Contact number is required',
  }),
});

// Validation schema for LostAndFind model
const createLostAndFind = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    age: z.number({
      required_error: 'Age is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    clothes: z.string({
      required_error: 'Clothes is required',
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
    placeWhereLost: z.string({
      required_error: 'Place where lost is required',
    }),
    imageUrl: z.string({
      required_error: 'Image URL is required',
    }),
    timeWhenLost: z.string({
      required_error: 'Time when lost is required',
    }),
    postedBy: postMakerSchema,
  }),
});

// Validation schema for updating LostAndFind model
const updateLostAndFind = z.object({
  body: z.object({
    isFound: z.boolean(),
  }),
});

// delete 
const deletePost = z.object({
  body: z.object({
    id: z.string()
  }),
});

export const LostAndFindValidation = {
  createLostAndFind,
  updateLostAndFind,
  deletePost
};
