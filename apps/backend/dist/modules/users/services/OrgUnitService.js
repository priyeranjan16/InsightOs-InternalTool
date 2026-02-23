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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrgUnitService = void 0;
const tsyringe_1 = require("tsyringe");
const OrgUnitRepository_1 = require("../repositories/OrgUnitRepository");
let OrgUnitService = class OrgUnitService {
    orgUnitRepository;
    constructor(orgUnitRepository) {
        this.orgUnitRepository = orgUnitRepository;
    }
    async createUnit(name, parentId) {
        return this.orgUnitRepository.create({ name, parentId });
    }
    async getTree() {
        return this.orgUnitRepository.findTree();
    }
    async updateUnit(id, name) {
        return this.orgUnitRepository.update(id, { name });
    }
    async deleteUnit(id) {
        return this.orgUnitRepository.delete(id);
    }
    async mapUserToUnit(userId, unitId, roleId) {
        return this.orgUnitRepository.mapUser(userId, unitId, roleId);
    }
    async getRoles() {
        return this.orgUnitRepository.getRoles();
    }
};
exports.OrgUnitService = OrgUnitService;
exports.OrgUnitService = OrgUnitService = __decorate([
    (0, tsyringe_1.singleton)(),
    __metadata("design:paramtypes", [OrgUnitRepository_1.OrgUnitRepository])
], OrgUnitService);
