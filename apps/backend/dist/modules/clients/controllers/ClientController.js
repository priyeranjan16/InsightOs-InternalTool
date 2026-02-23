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
exports.ClientController = void 0;
const tsyringe_1 = require("tsyringe");
const ClientService_1 = require("../services/ClientService");
let ClientController = class ClientController {
    clientService;
    constructor(clientService) {
        this.clientService = clientService;
    }
    create = async (req, res, next) => {
        try {
            const client = await this.clientService.createClient(req.body);
            res.status(201).json({ status: 'success', data: client });
        }
        catch (error) {
            next(error);
        }
    };
    getAll = async (req, res, next) => {
        try {
            const clients = await this.clientService.getAllClients();
            res.status(200).json({ status: 'success', data: clients });
        }
        catch (error) {
            next(error);
        }
    };
    getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const client = await this.clientService.getClientById(id);
            res.status(200).json({ status: 'success', data: client });
        }
        catch (error) {
            next(error);
        }
    };
    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const client = await this.clientService.updateClient(id, req.body);
            res.status(200).json({ status: 'success', data: client });
        }
        catch (error) {
            next(error);
        }
    };
    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.clientService.deleteClient(id);
            res.status(200).json({ status: 'success', data: null });
        }
        catch (error) {
            next(error);
        }
    };
};
exports.ClientController = ClientController;
exports.ClientController = ClientController = __decorate([
    (0, tsyringe_1.singleton)(),
    __metadata("design:paramtypes", [ClientService_1.ClientService])
], ClientController);
