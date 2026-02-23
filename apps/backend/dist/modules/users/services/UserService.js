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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tsyringe_1 = require("tsyringe");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserRepository_1 = require("../repositories/UserRepository");
const AppError_1 = require("../../../shared/utils/AppError");
let UserService = class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async register(data) {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new AppError_1.AppError('Email already in use', 400);
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const passwordHash = await bcryptjs_1.default.hash(data.password, salt);
        const user = await this.userRepository.create(data, passwordHash);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordHash: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async login(data) {
        const user = await this.userRepository.findByEmail(data.email);
        if (!user) {
            throw new AppError_1.AppError('Invalid email or password', 401);
        }
        const isMatch = await bcryptjs_1.default.compare(data.password, user.passwordHash);
        if (!isMatch) {
            throw new AppError_1.AppError('Invalid email or password', 401);
        }
        if (!user.isActive) {
            throw new AppError_1.AppError('Your account has been deactivated. Please contact an administrator.', 403);
        }
        const payload = {
            id: user.id,
            role: user.role,
            businessUnitId: user.businessUnitId,
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || 'secret');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordHash: _, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }
    async toggleUserStatus(id) {
        return this.userRepository.toggleStatus(id);
    }
    async getBusinessUnits() {
        return this.userRepository.getBusinessUnits();
    }
    async getAllUsers() {
        return this.userRepository.getUsers();
    }
    async createBusinessUnit(name) {
        if (!name) {
            throw new AppError_1.AppError('Business unit name is required', 400);
        }
        return this.userRepository.createBusinessUnit(name);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(UserRepository_1.UserRepository)),
    __metadata("design:paramtypes", [UserRepository_1.UserRepository])
], UserService);
