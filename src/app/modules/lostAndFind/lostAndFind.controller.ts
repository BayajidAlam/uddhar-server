import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constaints/pagination';
import { LostAndFindService } from './lostAndFind.service';
import { LostAndFind } from '@prisma/client';
import { LostAndFindFilterableFields } from './lostAndFind.constant';

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  const {  ...colorData } = req.query;
  const filters = pick(colorData, LostAndFindFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await LostAndFindService.getAll(
    filters,
    paginationOptions
  );

  sendResponse<LostAndFind[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Lost and found post retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

//create
const createLostAndFind = catchAsync(async (req: Request, res: Response) => {

  const {postedBy,...lostPersonData} = req.body;
  const result = await LostAndFindService.createLostAndFind(postedBy,lostPersonData);

  sendResponse<LostAndFind>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Lost post created Successfully',
    data: result,
  });
});

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await LostAndFindService.updateSingle(id, data);

  sendResponse<LostAndFind>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Color Updated Successfully',
    data: result,
  });
});


export const LostAndFindController = {
  createLostAndFind,
  getAll,
  updateSingle,
};
