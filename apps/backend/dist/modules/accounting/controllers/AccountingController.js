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
exports.AccountingController = void 0;
const tsyringe_1 = require("tsyringe");
const AccountingService_1 = require("../services/AccountingService");
const AccountingDTO_1 = require("../dtos/AccountingDTO");
let AccountingController = class AccountingController {
    accountingService;
    constructor(accountingService) {
        this.accountingService = accountingService;
    }
    createInvoice = async (req, res, next) => {
        try {
            const parsedData = AccountingDTO_1.CreateInvoiceSchema.parse(req.body);
            const invoice = await this.accountingService.createInvoice(parsedData);
            res.status(201).json({ status: 'success', data: invoice });
        }
        catch (err) {
            next(err);
        }
    };
    getInvoices = async (req, res, next) => {
        try {
            const invoices = await this.accountingService.getInvoices();
            res.status(200).json({ status: 'success', data: invoices });
        }
        catch (err) {
            next(err);
        }
    };
    createExpense = async (req, res, next) => {
        try {
            const parsedData = AccountingDTO_1.CreateExpenseSchema.parse(req.body);
            const expense = await this.accountingService.createExpense(parsedData);
            res.status(201).json({ status: 'success', data: expense });
        }
        catch (err) {
            next(err);
        }
    };
    getExpenses = async (req, res, next) => {
        try {
            const expenses = await this.accountingService.getExpenses();
            res.status(200).json({ status: 'success', data: expenses });
        }
        catch (err) {
            next(err);
        }
    };
    getGstr1 = async (req, res, next) => {
        try {
            const report = await this.accountingService.generateGstr1Report();
            res.status(200).json({ status: 'success', data: report });
        }
        catch (err) {
            next(err);
        }
    };
};
exports.AccountingController = AccountingController;
exports.AccountingController = AccountingController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(AccountingService_1.AccountingService)),
    __metadata("design:paramtypes", [AccountingService_1.AccountingService])
], AccountingController);
