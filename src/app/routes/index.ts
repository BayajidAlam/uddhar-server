import express from 'express';
import { LostAndFindRoutes } from '../modules/lostAndFind/lostAndFind.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/lost-and-found',
    route: LostAndFindRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
