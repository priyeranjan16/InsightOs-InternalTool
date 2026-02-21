import { singleton } from 'tsyringe';
import { OrgUnitRepository } from '../repositories/OrgUnitRepository';

@singleton()
export class OrgUnitService {
    constructor(private orgUnitRepository: OrgUnitRepository) { }

    async createUnit(name: string, parentId?: string) {
        return this.orgUnitRepository.create({ name, parentId });
    }

    async getTree() {
        return this.orgUnitRepository.findTree();
    }

    async updateUnit(id: string, name: string) {
        return this.orgUnitRepository.update(id, { name });
    }

    async deleteUnit(id: string) {
        return this.orgUnitRepository.delete(id);
    }

    async mapUserToUnit(userId: string, unitId: string, roleId: string) {
        return this.orgUnitRepository.mapUser(userId, unitId, roleId);
    }

    async getRoles() {
        return this.orgUnitRepository.getRoles();
    }
}
