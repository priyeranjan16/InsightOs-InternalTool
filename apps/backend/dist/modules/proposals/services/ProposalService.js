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
exports.ProposalService = void 0;
const tsyringe_1 = require("tsyringe");
const ProposalRepository_1 = require("../repositories/ProposalRepository");
const AppError_1 = require("../../../shared/utils/AppError");
let ProposalService = class ProposalService {
    proposalRepository;
    constructor(proposalRepository) {
        this.proposalRepository = proposalRepository;
    }
    async createProposal(data) {
        return this.proposalRepository.create(data);
    }
    async getProposals() {
        return this.proposalRepository.findAll();
    }
    async getProposal(id) {
        const proposal = await this.proposalRepository.findById(id);
        if (!proposal)
            throw new AppError_1.AppError('Proposal not found', 404);
        return proposal;
    }
    async updateProposal(id, data) {
        return this.proposalRepository.update(id, data);
    }
    async deleteProposal(id) {
        return this.proposalRepository.delete(id);
    }
};
exports.ProposalService = ProposalService;
exports.ProposalService = ProposalService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(ProposalRepository_1.ProposalRepository)),
    __metadata("design:paramtypes", [ProposalRepository_1.ProposalRepository])
], ProposalService);
