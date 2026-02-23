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
exports.ClientService = void 0;
const tsyringe_1 = require("tsyringe");
const ClientRepository_1 = require("../repositories/ClientRepository");
let ClientService = class ClientService {
    clientRepository;
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    async createClient(data) {
        return this.clientRepository.create(data);
    }
    async getAllClients() {
        return this.clientRepository.findAll();
    }
    async getClientById(id) {
        return this.clientRepository.findById(id);
    }
    async updateClient(id, data) {
        return this.clientRepository.update(id, data);
    }
    async deleteClient(id) {
        return this.clientRepository.delete(id);
    }
};
exports.ClientService = ClientService;
exports.ClientService = ClientService = __decorate([
    (0, tsyringe_1.singleton)(),
    __metadata("design:paramtypes", [ClientRepository_1.ClientRepository])
], ClientService);
