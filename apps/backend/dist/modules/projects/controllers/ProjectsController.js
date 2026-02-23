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
exports.ProjectsController = void 0;
const tsyringe_1 = require("tsyringe");
const ProjectsService_1 = require("../services/ProjectsService");
const ProjectsDTO_1 = require("../dtos/ProjectsDTO");
let ProjectsController = class ProjectsController {
    projectsService;
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    createProject = async (req, res, next) => {
        try {
            const parsedData = ProjectsDTO_1.CreateProjectSchema.parse(req.body);
            const project = await this.projectsService.createProject(parsedData);
            res.status(201).json({ status: 'success', data: project });
        }
        catch (err) {
            next(err);
        }
    };
    getProjects = async (req, res, next) => {
        try {
            const projects = await this.projectsService.getProjects();
            res.status(200).json({ status: 'success', data: projects });
        }
        catch (err) {
            next(err);
        }
    };
    createTask = async (req, res, next) => {
        try {
            const parsedData = ProjectsDTO_1.CreateTaskSchema.parse(req.body);
            const task = await this.projectsService.createTask(parsedData);
            res.status(201).json({ status: 'success', data: task });
        }
        catch (err) {
            next(err);
        }
    };
    logTime = async (req, res, next) => {
        try {
            const parsedData = ProjectsDTO_1.CreateTimesheetSchema.parse(req.body);
            const userId = req.user.id; // extracted from token
            const timesheet = await this.projectsService.logTime(userId, parsedData);
            res.status(201).json({ status: 'success', data: timesheet });
        }
        catch (err) {
            next(err);
        }
    };
    getProfitability = async (req, res, next) => {
        try {
            const { id } = req.params;
            const metrics = await this.projectsService.calculateProfitability(id);
            res.status(200).json({ status: 'success', data: metrics });
        }
        catch (err) {
            next(err);
        }
    };
};
exports.ProjectsController = ProjectsController;
exports.ProjectsController = ProjectsController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(ProjectsService_1.ProjectsService)),
    __metadata("design:paramtypes", [ProjectsService_1.ProjectsService])
], ProjectsController);
