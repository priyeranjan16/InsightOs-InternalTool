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
exports.ProposalController = void 0;
const tsyringe_1 = require("tsyringe");
const ProposalService_1 = require("../services/ProposalService");
const ProposalDTO_1 = require("../dtos/ProposalDTO");
let ProposalController = class ProposalController {
    proposalService;
    constructor(proposalService) {
        this.proposalService = proposalService;
    }
    createProposal = async (req, res, next) => {
        try {
            const parsedData = ProposalDTO_1.CreateProposalSchema.parse(req.body);
            const proposal = await this.proposalService.createProposal(parsedData);
            res.status(201).json({ status: 'success', data: proposal });
        }
        catch (err) {
            next(err);
        }
    };
    getProposals = async (req, res, next) => {
        try {
            const proposals = await this.proposalService.getProposals();
            res.status(200).json({ status: 'success', data: proposals });
        }
        catch (err) {
            next(err);
        }
    };
    getProposal = async (req, res, next) => {
        try {
            const proposal = await this.proposalService.getProposal(req.params.id);
            res.status(200).json({ status: 'success', data: proposal });
        }
        catch (err) {
            next(err);
        }
    };
    updateProposal = async (req, res, next) => {
        try {
            const parsedData = ProposalDTO_1.UpdateProposalSchema.parse(req.body);
            const proposal = await this.proposalService.updateProposal(req.params.id, parsedData);
            res.status(200).json({ status: 'success', data: proposal });
        }
        catch (err) {
            next(err);
        }
    };
    deleteProposal = async (req, res, next) => {
        try {
            await this.proposalService.deleteProposal(req.params.id);
            res.status(204).json({ status: 'success', data: null });
        }
        catch (err) {
            next(err);
        }
    };
};
exports.ProposalController = ProposalController;
exports.ProposalController = ProposalController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(ProposalService_1.ProposalService)),
    __metadata("design:paramtypes", [ProposalService_1.ProposalService])
], ProposalController);
