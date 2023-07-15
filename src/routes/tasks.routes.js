import { Router } from 'express';
import { authRequired } from '../middlewares/validatorToken.js';
import {
   createdTask,
   deleteTask,
   getAllTasks,
   getTask,
   updateTask,
} from '../controllers/tasks.controllers.js';
import { validateScheme } from '../middlewares/validator.middlewares.js';
import { tasksSchema } from '../schemas/tasks.schemas.js';

const router = Router();

router.get('/tasks', authRequired, getAllTasks);
router.get('/tasks/:id', authRequired, getTask);
router.post('/tasks', authRequired, validateScheme(tasksSchema), createdTask);
router.put('/tasks/:id', authRequired, updateTask);
router.delete('/tasks/:id', authRequired, deleteTask);

export default router;
