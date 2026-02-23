"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const tsyringe_1 = require("tsyringe");
const ProjectsRepository_1 = require("../repositories/ProjectsRepository");
const AppError_1 = require("../../../shared/utils/AppError");
let ProjectsService = class ProjectsService {
    projectsRepository;
    constructor(projectsRepository) {
        this.projectsRepository = projectsRepository;
    }
    async createProject(data) {
        return this.projectsRepository.createProject(data);
    }
    async getProjects() {
        return this.projectsRepository.getProjects();
    }
    async createTask(data) {
        return this.projectsRepository.createTask(data);
    }
    async logTime(userId, data) {
        return this.projectsRepository.logTime(userId, data);
    }
    async calculateProfitability(projectId) {
        const project = await this.projectsRepository.getProjectWithTimesheets(projectId);
        if (!project)
            throw new AppError_1.AppError('Project not found', 404);
        let actualRevenue = 0;
        // In a real system, Actual Revenue would be derived from Invoices or Opportunity deal value
        if (project.opportunity) {
            actualRevenue = Number(project.opportunity.dealValue);
        }
        else if (project.budget) {
            actualRevenue = Number(project.budget);
        }
        // Fixed dummy assumptions for cost
        // For each employee: cost = (monthly CTC / working hours * hours logged)
        // Assume average hourly rate = 500 INR
        let employeeCost = 0;
        project.timesheets.forEach((ts) => {
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
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(ProjectsRepository_1.ProjectsRepository)),
    __metadata("design:paramtypes", [ProjectsRepository_1.ProjectsRepository])
], ProjectsService);
