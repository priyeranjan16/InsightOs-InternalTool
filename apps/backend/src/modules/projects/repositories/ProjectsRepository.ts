import { injectable, inject } from 'tsyringe';
import { PrismaClient, Project, Task, Timesheet } from '@prisma/client';
import { CreateProjectDTO, CreateTaskDTO, CreateTimesheetDTO } from '../dtos/ProjectsDTO';

@injectable()
export class ProjectsRepository {
    constructor(@inject('PrismaClient') private prisma: PrismaClient) { }

    async createProject(data: CreateProjectDTO): Promise<Project> {
        return this.prisma.project.create({ data });
    }

    async getProjects(): Promise<Project[]> {
        return this.prisma.project.findMany({ include: { tasks: true, timesheets: true, client: true } });
    }

    async createTask(data: CreateTaskDTO): Promise<Task> {
        return this.prisma.task.create({ data });
    }

    async logTime(userId: string, data: CreateTimesheetDTO): Promise<Timesheet> {
        return this.prisma.timesheet.create({
            data: {
                userId,
                projectId: data.projectId,
                hoursLogged: data.hoursLogged,
                date: data.date,
                isBillable: data.isBillable,
            },
        });
    }

    async getProjectWithTimesheets(id: string) {
        return this.prisma.project.findUnique({
            where: { id },
            include: { timesheets: { include: { user: true } }, opportunity: true },
        });
    }
}
