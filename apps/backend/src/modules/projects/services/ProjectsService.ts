import { injectable, inject } from 'tsyringe';
import { ProjectsRepository } from '../repositories/ProjectsRepository';
import { CreateProjectDTO, CreateTaskDTO, CreateTimesheetDTO } from '../dtos/ProjectsDTO';
import { AppError } from '../../../shared/utils/AppError';

@injectable()
export class ProjectsService {
    constructor(@inject(ProjectsRepository) private projectsRepository: ProjectsRepository) { }

    async createProject(data: CreateProjectDTO) {
        return this.projectsRepository.createProject(data);
    }

    async getProjects() {
        return this.projectsRepository.getProjects();
    }

    async createTask(data: CreateTaskDTO) {
        return this.projectsRepository.createTask(data);
    }

    async logTime(userId: string, data: CreateTimesheetDTO) {
        return this.projectsRepository.logTime(userId, data);
    }

    async calculateProfitability(projectId: string) {
        const project = await this.projectsRepository.getProjectWithTimesheets(projectId);
        if (!project) throw new AppError('Project not found', 404);

        let actualRevenue = 0;

        // In a real system, Actual Revenue would be derived from Invoices or Opportunity deal value
        if (project.opportunity) {
            actualRevenue = Number(project.opportunity.dealValue);
        } else if (project.budget) {
            actualRevenue = Number(project.budget);
        }

        // Fixed dummy assumptions for cost
        // For each employee: cost = (monthly CTC / working hours * hours logged)
        // Assume average hourly rate = 500 INR
        let employeeCost = 0;
        project.timesheets.forEach((ts: any) => {
            employeeCost += Number(ts.hoursLogged) * 500;
        });

        // Assume fixed overhead allocation per project
        const overheadAllocation = 5000;

        const netProfit = actualRevenue - employeeCost - overheadAllocation;

        return {
            projectId: project.id,
            projectName: project.name,
            actualRevenue,
            employeeCost,
            overheadAllocation,
            netProfit,
        };
    }
}
