import express from "express";
import UserController from "../controllers/userController.js";
import checkUserAuth from "../middlewares/auth-middeleware.js";


const router = express.Router();

// Route Level Middleware - To Protect Routecons
router.use('/changepassword', checkUserAuth)
router.use('/loggeduser', checkUserAuth)



//Public Routes
router.post('/register', UserController.userRegistration);
router.post('/login', UserController.userLogin)
router.post('/send-reset-password-email', UserController.sendUserPasswordResetEmail)
router.post('/reset/:id/:token', UserController.userPasswordReset)



// Protected Routes
router.post('/changepassword', UserController.changeUserPassword)
router.get('/loggeduser', UserController.loggedUser)



export default router