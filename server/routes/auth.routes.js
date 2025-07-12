import express from 'express';
import { signup, login,verifyOTP  } from '../controllers/auth.controller.js';
import { signupValidation, loginValidation } from '../validation/auth.validation.js';
import { validate } from '../middleware/validate.js';


const router = express.Router();

router.post('/signup', signupValidation, validate, signup);
router.post('/login', loginValidation, validate, login);
router.post('/signup', signup);
router.post('/verify-otp', verifyOTP);
router.post('/login', login);

export default router;