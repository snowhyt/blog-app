import express from "express";
import { login, logout, signup, updateProfile, checkAuth } from "../controller/auth.controller";
import { protectRoute } from "../middleware/auth.middleware";
import multer from "multer";


const router = express.Router();


// Configure multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post("/signup", signup); 
router.post("/login",login);
router.post("/logout",logout);

router.post("/update-profile", protectRoute, upload.single("image"), updateProfile);
router.get("/check", protectRoute, checkAuth);
export default router;