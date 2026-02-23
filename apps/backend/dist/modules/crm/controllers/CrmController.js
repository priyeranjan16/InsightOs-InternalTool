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
exports.CrmController = void 0;
const tsyringe_1 = require("tsyringe");
const CrmService_1 = require("../services/CrmService");
const CrmDTO_1 = require("../dtos/CrmDTO");
const AppError_1 = require("../../../shared/utils/AppError");
let CrmController = class CrmController {
    crmService;
    constructor(crmService) {
        this.crmService = crmService;
    }
    createAccount = async (req, res, next) => {
        try {
            const parsedData = CrmDTO_1.CreateAccountSchema.parse(req.body);
            const account = await this.crmService.createAccount(parsedData);
            res.status(201).json({ status: 'success', data: account });
        }
        catch (err) {
            next(err);
        }
    };
    getAccounts = async (req, res, next) => {
        try {
            const accounts = await this.crmService.getAccounts();
            res.status(200).json({ status: 'success', data: accounts });
        }
        catch (err) {
            next(err);
        }
    };
    createOpportunity = async (req, res, next) => {
        try {
            console.log('Creating Opportunity with body:', req.body);
            const parsedData = CrmDTO_1.CreateOpportunitySchema.parse(req.body);
            console.log('Parsed Data:', parsedData);
            const opp = await this.crmService.createOpportunity(parsedData);
            res.status(201).json({ status: 'success', data: opp });
        }
        catch (err) {
            console.error('CONTROLLER ERROR:', err);
            // Catch Prisma errors and re-throw with message
            if (err.code && err.message) {
                return next(new AppError_1.AppError(`Prisma Error [${err.code}]: ${err.message}`, 500));
            }
            next(err);
        }
    };
    updateOpportunityStage = async (req, res, next) => {
        try {
            const parsedData = CrmDTO_1.UpdateOpportunityStageSchema.parse(req.body);
            const { id } = req.params;
            const opp = await this.crmService.updateOpportunityStage(id, parsedData);
            res.status(200).json({ status: 'success', data: opp });
        }
        catch (err) {
            next(err);
        }
    };
    updateOpportunity = async (req, res, next) => {
        try {
            const parsedData = CrmDTO_1.UpdateOpportunitySchema.parse(req.body);
            const { id } = req.params;
            const opp = await this.crmService.updateOpportunity(id, parsedData);
            res.status(200).json({ status: 'success', data: opp });
        }
        catch (err) {
            next(err);
        }
    };
    convertToProject = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { billingModel } = req.body;
            const project = await this.crmService.convertToProject(id, billingModel);
            res.status(200).json({ status: 'success', data: project });
        }
        catch (err) {
            next(err);
        }
    };
    getOpportunities = async (req, res, next) => {
        try {
            const opps = await this.crmService.getOpportunities();
            res.status(200).json({ status: 'success', data: opps });
        }
        catch (err) {
            next(err);
        }
    };
};
exports.CrmController = CrmController;
exports.CrmController = CrmController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(CrmService_1.CrmService)),
    __metadata("design:paramtypes", [CrmService_1.CrmService])
], CrmController);
