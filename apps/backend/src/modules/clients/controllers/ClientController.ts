import { Request, Response, NextFunction } from 'express';
import { singleton } from 'tsyringe';
import { ClientService } from '../services/ClientService';

@singleton()
export class ClientController {
    constructor(private clientService: ClientService) { }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const client = await this.clientService.createClient(req.body);
            res.status(201).json({ status: 'success', data: client });
        } catch (error: any) {
            next(error);
        }
    };

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const clients = await this.clientService.getAllClients();
            res.status(200).json({ status: 'success', data: clients });
        } catch (error: any) {
            next(error);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const client = await this.clientService.getClientById(id);
            res.status(200).json({ status: 'success', data: client });
        } catch (error: any) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const client = await this.clientService.updateClient(id, req.body);
            res.status(200).json({ status: 'success', data: client });
        } catch (error: any) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await this.clientService.deleteClient(id);
            res.status(200).json({ status: 'success', data: null });
        } catch (error: any) {
            next(error);
        }
    };
}
