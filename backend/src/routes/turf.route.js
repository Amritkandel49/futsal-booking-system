import { Router } from "express";

import {
    getAllTurfs,
    getTurfById
} from '../controllers/turf.controller.js'

const router = Router();

router.route('/get-all-turfs').get(getAllTurfs);
router.route('/get-turf/:id').get(getTurfById);


export default router;