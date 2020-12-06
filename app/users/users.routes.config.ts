import {CommonRoutesConfig, configureRoutes} from '../common/common.routes.config';
import {UsersController} from './controllers/users.controller';
import express from 'express';
import {UsersMiddleware} from "./middlewares/users.middleware";
export class UsersRoutes extends CommonRoutesConfig implements configureRoutes{
    constructor(app: express.Application) {
        super(app, 'UsersRoute');
        this.configureRoutes();
    }
    configureRoutes() {
        const usersController = new UsersController();
        const usersMiddleware = UsersMiddleware.getInstance();

        this.app.get(`/users`, [
            usersController.listUsers
        ]);
        this.app.post(`/users`, [
            usersMiddleware.validateRequiredCreateUserBodyFields,
            usersController.createUser
        ]);
        this.app.patch(`/users/:userId`, [
            usersMiddleware.validateUserExists,
            usersMiddleware.extractUserId,
            usersController.patch
        ]);
        this.app.delete(`/users/:userId`, [
            usersMiddleware.validateUserExists,
            usersMiddleware.extractUserId,
            usersController.removeUser
        ]);
        this.app.get(`/users/:userId`, [
            usersMiddleware.validateUserExists,
            usersMiddleware.extractUserId,
            usersController.getUserById
        ]);
    }
}
