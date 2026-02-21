import { Request, Response, NextFunction } from 'express';
import { singleton } from 'tsyringe';
import { OrgUnitService } from '../services/OrgUnitService';

@singleton()
export class OrgUnitController {
    constructor(private orgUnitService: OrgUnitService) { }

    createUnit = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, parentId } = req.body;
            const unit = await this.orgUnitService.createUnit(name, parentId);
            res.status(201).json({ status: 'success', data: unit });
        } catch (error: any) {
            next(error);
        }
    };

    getTree = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tree = await this.orgUnitService.getTree();
            res.status(200).json({ status: 'success', data: tree });
        } catch (error: any) {
            next(error);
        }
    };

    updateUnit = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const unit = await this.orgUnitService.updateUnit(id, name);
            res.status(200).json({ status: 'success', data: unit });
        } catch (error: any) {
            next(error);
        }
    };

    deleteUnit = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await this.orgUnitService.deleteUnit(id);
            res.status(200).json({ status: 'success', data: null });
        } catch (error: any) {
            next(error);
        }
    };

    mapUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId, unitId, roleId } = req.body;
            const mapping = await this.orgUnitService.mapUserToUnit(userId, unitId, roleId);
            res.status(200).json({ status: 'success', data: mapping });
        } catch (error: any) {
            next(error);
        }
    };

    getRoles = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const roles = await this.orgUnitService.getRoles();
            res.status(200).json({ status: 'success', data: roles });
        } catch (error: any) {
            next(error);
        }
    };
}
