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
exports.OrgUnitController = void 0;
const tsyringe_1 = require("tsyringe");
const OrgUnitService_1 = require("../services/OrgUnitService");
let OrgUnitController = class OrgUnitController {
    orgUnitService;
    constructor(orgUnitService) {
        this.orgUnitService = orgUnitService;
    }
    createUnit = async (req, res, next) => {
        try {
            const { name, parentId } = req.body;
            const unit = await this.orgUnitService.createUnit(name, parentId);
            res.status(201).json({ status: 'success', data: unit });
        }
        catch (error) {
            next(error);
        }
    };
    getTree = async (req, res, next) => {
        try {
            const tree = await this.orgUnitService.getTree();
            res.status(200).json({ status: 'success', data: tree });
        }
        catch (error) {
            next(error);
        }
    };
    updateUnit = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const unit = await this.orgUnitService.updateUnit(id, name);
            res.status(200).json({ status: 'success', data: unit });
        }
        catch (error) {
            next(error);
        }
    };
    deleteUnit = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.orgUnitService.deleteUnit(id);
            res.status(200).json({ status: 'success', data: null });
        }
        catch (error) {
            next(error);
        }
    };
    mapUser = async (req, res, next) => {
        try {
            const { userId, unitId, roleId } = req.body;
            const mapping = await this.orgUnitService.mapUserToUnit(userId, unitId, roleId);
            res.status(200).json({ status: 'success', data: mapping });
        }
        catch (error) {
            next(error);
        }
    };
    getRoles = async (req, res, next) => {
        try {
            const roles = await this.orgUnitService.getRoles();
            res.status(200).json({ status: 'success', data: roles });
        }
        catch (error) {
            next(error);
        }
    };
};
exports.OrgUnitController = OrgUnitController;
exports.OrgUnitController = OrgUnitController = __decorate([
    (0, tsyringe_1.singleton)(),
    __metadata("design:paramtypes", [OrgUnitService_1.OrgUnitService])
], OrgUnitController);
