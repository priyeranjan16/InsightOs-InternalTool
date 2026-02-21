import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { UserService } from '../services/UserService';
import { RegisterUserSchema, LoginUserSchema } from '../dtos/AuthDTO';

@injectable()
export class UserController {
    constructor(@inject(UserService) private userService: UserService) { }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsedData = RegisterUserSchema.parse(req.body);
            const user = await this.userService.register(parsedData);
            res.status(201).json({ status: 'success', data: user });
        } catch (err: any) {
            next(err);
        }
    };

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsedData = LoginUserSchema.parse(req.body);
            const result = await this.userService.login(parsedData);
            res.status(200).json({ status: 'success', data: result });
        } catch (err: any) {
            next(err);
        }
    };

    getBusinessUnits = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const units = await this.userService.getBusinessUnits();
            res.status(200).json({ status: 'success', data: units });
        } catch (err: any) {
            next(err);
        }
    };

    getUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json({ status: 'success', data: users });
        } catch (err: any) {
            next(err);
        }
    };

    createBusinessUnit = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name } = req.body;
            const unit = await this.userService.createBusinessUnit(name);
            res.status(201).json({ status: 'success', data: unit });
        } catch (err: any) {
            next(err);
        }
    };

    toggleStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const user = await this.userService.toggleUserStatus(id);
            res.status(200).json({ status: 'success', data: user });
        } catch (err: any) {
            next(err);
        }
    };
}
