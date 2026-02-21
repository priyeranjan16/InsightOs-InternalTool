import { singleton } from 'tsyringe';
import { ClientRepository } from '../repositories/ClientRepository';

@singleton()
export class ClientService {
    constructor(private clientRepository: ClientRepository) { }

    async createClient(data: any) {
        return this.clientRepository.create(data);
    }

    async getAllClients() {
        return this.clientRepository.findAll();
    }

    async getClientById(id: string) {
        return this.clientRepository.findById(id);
    }

    async updateClient(id: string, data: any) {
        return this.clientRepository.update(id, data);
    }

    async deleteClient(id: string) {
        return this.clientRepository.delete(id);
    }
}
