import { Router } from 'express';
import { container } from 'tsyringe';
import { ProjectsController } from './controllers/ProjectsController';
import { protect, restrictTo } from '../../shared/middlewares/authMiddleware';

const router = Router();
const projectsController = container.resolve(ProjectsController);

router.use(protect);

router.post('/', restrictTo('ADMIN', 'PROJECT_MANAGER'), projectsController.createProject);
router.get('/', projectsController.getProjects);

router.post('/tasks', restrictTo('ADMIN', 'PROJECT_MANAGER', 'EMPLOYEE'), projectsController.createTask);

router.post('/timesheets', restrictTo('EMPLOYEE', 'PROJECT_MANAGER', 'ADMIN'), projectsController.logTime);

router.get('/:id/profitability', restrictTo('ADMIN', 'FINANCE', 'PROJECT_MANAGER'), projectsController.getProfitability);

export default router;
