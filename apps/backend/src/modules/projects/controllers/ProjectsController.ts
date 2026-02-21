import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { ProjectsService } from '../services/ProjectsService';
import { CreateProjectSchema, CreateTaskSchema, CreateTimesheetSchema } from '../dtos/ProjectsDTO';
import { AuthRequest } from '../../../shared/middlewares/authMiddleware';

@injectable()
export class ProjectsController {
    constructor(@inject(ProjectsService) private projectsService: ProjectsService) { }

    createProject = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsedData = CreateProjectSchema.parse(req.body);
            const project = await this.projectsService.createProject(parsedData);
            res.status(201).json({ status: 'success', data: project });
        } catch (err) {
            next(err);
        }
    };

    getProjects = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const projects = await this.projectsService.getProjects();
            res.status(200).json({ status: 'success', data: projects });
        } catch (err) {
            next(err);
        }
    };

    createTask = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsedData = CreateTaskSchema.parse(req.body);
            const task = await this.projectsService.createTask(parsedData);
            res.status(201).json({ status: 'success', data: task });
        } catch (err) {
            next(err);
        }
    };

    logTime = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const parsedData = CreateTimesheetSchema.parse(req.body);
            const userId = req.user!.id; // extracted from token
            const timesheet = await this.projectsService.logTime(userId, parsedData);
            res.status(201).json({ status: 'success', data: timesheet });
        } catch (err) {
            next(err);
        }
    };

    getProfitability = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const metrics = await this.projectsService.calculateProfitability(id);
            res.status(200).json({ status: 'success', data: metrics });
        } catch (err) {
            next(err);
        }
    };
}
