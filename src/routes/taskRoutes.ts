import { Router } from 'express';
import { TaskController } from '../controllers/taskController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const taskController = new TaskController();

// verficiation of the user request with authorized token 
router.use(authMiddleware);


router.post('/', taskController.createTask); 
router.get('/', taskController.getTasks); 
router.put('/:id', taskController.updateTask); // get taks id in params
router.delete('/:id', taskController.deleteTask); 
router.patch('/tasks/:taskId/toggle', taskController.toggleTaskCompletion); // task id in params


export default router;