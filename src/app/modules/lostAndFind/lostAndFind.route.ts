import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { LostAndFindValidation } from './lostAndFind.validation';
import { LostAndFindController } from './lostAndFind.controller';
const router = express.Router();

// get all
router.get('/', LostAndFindController.getAll);

//count of total found people
router.get(
  '/count',
  LostAndFindController.getCount
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

router.delete(
  '/:id',
  LostAndFindController.deletePost)
  
export const LostAndFindRoutes = router;
