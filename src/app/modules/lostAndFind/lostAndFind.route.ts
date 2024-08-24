import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {  LostAndFindValidation } from './lostAndFind.validation';
import { LostAndFindController } from './lostAndFind.controller';
const router = express.Router();

// get all
router.get(
  '/',
  LostAndFindController.getAll
);

// create 
router.post(
  '/create-lost',
  validateRequest(LostAndFindValidation.createLostAndFind),
  LostAndFindController.createLostAndFind
);

// update single
router.patch(
  '/:id',
  validateRequest(LostAndFindValidation.updateLostAndFind),
  LostAndFindController.updateSingle
);


export const LostAndFindRoutes = router;
