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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tsyringe_1 = require("tsyringe");
const UserService_1 = require("../services/UserService");
const AuthDTO_1 = require("../dtos/AuthDTO");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    register = async (req, res, next) => {
        try {
            const parsedData = AuthDTO_1.RegisterUserSchema.parse(req.body);
            const user = await this.userService.register(parsedData);
            res.status(201).json({ status: 'success', data: user });
        }
        catch (err) {
            next(err);
        }
    };
    login = async (req, res, next) => {
        try {
            const parsedData = AuthDTO_1.LoginUserSchema.parse(req.body);
            const result = await this.userService.login(parsedData);
            res.status(200).json({ status: 'success', data: result });
        }
        catch (err) {
            next(err);
        }
    };
    getBusinessUnits = async (req, res, next) => {
        try {
            const units = await this.userService.getBusinessUnits();
            res.status(200).json({ status: 'success', data: units });
        }
        catch (err) {
            next(err);
        }
    };
    getUsers = async (req, res, next) => {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json({ status: 'success', data: users });
        }
        catch (err) {
            next(err);
        }
    };
    createBusinessUnit = async (req, res, next) => {
        try {
            const { name } = req.body;
            const unit = await this.userService.createBusinessUnit(name);
            res.status(201).json({ status: 'success', data: unit });
        }
        catch (err) {
            next(err);
        }
    };
    toggleStatus = async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await this.userService.toggleUserStatus(id);
            res.status(200).json({ status: 'success', data: user });
        }
        catch (err) {
            next(err);
        }
    };
};
exports.UserController = UserController;
exports.UserController = UserController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(UserService_1.UserService)),
    __metadata("design:paramtypes", [UserService_1.UserService])
], UserController);
