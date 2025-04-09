import { Router } from 'express';
import { TaskController } from '../controllers/taskController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const taskController = new TaskController();


router.use(authMiddleware);


router.post('/', taskController.createTask); 
router.get('/', taskController.getTasks); 
router.put('/:id', taskController.updateTask); 
router.delete('/:id', taskController.deleteTask); 
router.patch('/tasks/:taskId/toggle', taskController.toggleTaskCompletion);


export default router;