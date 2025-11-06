import { Router } from "express";
import { registeruser } from "../controllers/user.controller.js"; // 👈 include .js


import{upload} from "../middlewares/multer.middleware.js"
const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxcount: 1
        },

        {
            name:"coverimage",
            maxCount: 1
        }

    ]),
    registeruser
);

export default router;
