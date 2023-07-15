import { Router } from 'express';
import {
   login,
   logout,
   register,
   profile,
   verifyToken,
} from '../controllers/auth.controllers.js';
import { authRequired } from '../middlewares/validatorToken.js';
import { validateScheme } from '../middlewares/validator.middlewares.js';
import { registerSchema, loginSchema } from '../schemas/auth.schemas.js';

const router = Router();

router.post('/register', validateScheme(registerSchema), register);
router.post('/login', validateScheme(loginSchema), login);
router.get('/verify', verifyToken);
router.post('/logout', logout);
router.get('/profile', authRequired, profile);

export default router;
