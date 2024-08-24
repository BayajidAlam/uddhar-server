import express from 'express';
import { ColorsRoutes } from '../modules/color/color.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/lost-and-found',
    route: ColorsRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
