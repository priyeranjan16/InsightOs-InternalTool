import { injectable, inject } from 'tsyringe';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository';
import { RegisterUserDTO, LoginUserDTO } from '../dtos/AuthDTO';
import { AppError } from '../../../shared/utils/AppError';

@injectable()
export class UserService {
    constructor(@inject(UserRepository) private userRepository: UserRepository) { }

    async register(data: RegisterUserDTO) {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new AppError('Email already in use', 400);
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(data.password, salt);

        const user = await this.userRepository.create(data, passwordHash);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordHash: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async login(data: LoginUserDTO) {
        const user = await this.userRepository.findByEmail(data.email);
        if (!user) {
            throw new AppError('Invalid email or password', 401);
        }

        const isMatch = await bcrypt.compare(data.password, user.passwordHash);
        if (!isMatch) {
            throw new AppError('Invalid email or password', 401);
        }

        if (!user.isActive) {
            throw new AppError('Your account has been deactivated. Please contact an administrator.', 403);
        }

        const payload = {
            id: user.id,
            role: user.role,
            businessUnitId: user.businessUnitId,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret');

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordHash: _, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }

    async toggleUserStatus(id: string) {
        return this.userRepository.toggleStatus(id);
    }

    async getBusinessUnits() {
        return this.userRepository.getBusinessUnits();
    }

    async getAllUsers() {
        return this.userRepository.getUsers();
    }

    async createBusinessUnit(name: string) {
        if (!name) {
            throw new AppError('Business unit name is required', 400);
        }
        return this.userRepository.createBusinessUnit(name);
    }
}
