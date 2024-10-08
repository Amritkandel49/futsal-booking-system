import { Router } from "express";
import { userTokenVerification } from '../middlewares/userTokenVerification.middleware.js'
const router = Router();



import {
    userRegister,
    userLogin,
    userLogout,
    refreshAccessToken,
    getCurrentUser
} from "../controllers/user.controller.js";

router.route('/register').post(userRegister);
router.route('/login').post(userLogin);
router.route('/logout').post(userTokenVerification, userLogout);
router.route('/refresh-token').post(refreshAccessToken);
router.route('/get-current-user').get(userTokenVerification, getCurrentUser);


export default router;