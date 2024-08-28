import { LostAndFind, PostMaker, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { ILostAndFindFilters } from './lostAndFind.interface';
import { LostAndFindSearchableFields } from './lostAndFind.constant';

// get all
const getAll = async (
  filters: ILostAndFindFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<LostAndFind[]>> => {
  const { searchTerm, isFound } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions: Prisma.LostAndFindWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: LostAndFindSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (typeof isFound !== 'undefined') {
    const isFoundBoolean = String(isFound) === 'true';
    andConditions.push({
      isFound: isFoundBoolean,
    });
  }

  const whereConditions: Prisma.LostAndFindWhereInput =
    andConditions.length > 1 ? { AND: andConditions } : andConditions[0];

  const result = await prisma.lostAndFind.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      postedBy: true,
    },
    skip,
    take: limit,
  });

  const total = await prisma.lostAndFind.count({
    where: whereConditions,
  });
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};

// get all
const getCount = async (
  filters: ILostAndFindFilters
): Promise<{ total: number }> => {
  const { isFound } = filters;

  const andConditions: Prisma.LostAndFindWhereInput[] = [];

  if (typeof isFound !== 'undefined') {
    const isFoundBoolean = String(isFound) === 'true';
    andConditions.push({
      isFound: isFoundBoolean,
    });
  }

  const whereConditions: Prisma.LostAndFindWhereInput =
    andConditions.length > 1 ? { AND: andConditions } : andConditions[0];

  const total = await prisma.lostAndFind.count({
    where: whereConditions,
  });
  
  return {
    total,
  };
};

//crate
const createLostAndFind = async (
  postedBy: PostMaker,
  lostPersonData: LostAndFind
): Promise<LostAndFind | null> => {
  const result = await prisma.$transaction(async prisma => {
    // Check if a user with the same phone number exists
    let postMaker = await prisma.postMaker.findUnique({
      where: { contactNumber: postedBy.contactNumber },
    });

    // If the user doesn't exist, create a new user
    if (!postMaker) {
      postMaker = await prisma.postMaker.create({
        data: postedBy,
      });
    }

    // Create the LostAndFind entry using the postMaker's ID
    const createdLostAndFind = await prisma.lostAndFind.create({
      data: {
        ...lostPersonData,
        postMakerId: postMaker.id,
      },
      include: {
        postedBy: true,
      },
    });

    return createdLostAndFind;
  });

  return result;
};

// update single
const updateSingle = async (
  id: string,
  payload: Partial<LostAndFind>
): Promise<LostAndFind | null> => {
  // check is exist
  const isExist = await prisma.lostAndFind.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Lost Post Not Found');
  }

  const result = await prisma.lostAndFind.update({
    where: {
      id,
    },
    include: {
      postedBy: true,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Status');
  }

  return result;
};

// delete single
const deletePost = async (id: string): Promise<LostAndFind | null> => {
  // check is exist
  const isExist = await prisma.lostAndFind.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Lost Post Not Found');
  }

  const result = await prisma.lostAndFind.delete({
    where: {
      id,
    },
  });

  return result;
};

export const LostAndFindService = {
  createLostAndFind,
  getAll,
  updateSingle,
  getCount,
  deletePost
};
