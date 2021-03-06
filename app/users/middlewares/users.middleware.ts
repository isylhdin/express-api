import express from 'express';
import {UsersService} from '../services/user.services';

export class UsersMiddleware {

    private static instance: UsersMiddleware;

    static getInstance() {
        if (!UsersMiddleware.instance) {
            UsersMiddleware.instance = new UsersMiddleware();
        }
        return UsersMiddleware.instance;
    }
    validateRequiredCreateUserBodyFields(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.body?.email && req.body?.password) {
            next();
        } else {
            res.status(400).send({error: `Missing required fields email and password`});
        }
    }
    async validateUserExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const userService = UsersService.getInstance();
        const user = await userService.readById(req.params.userId);
        if (user) {
            next();
        } else {
            res.status(404).send({error: `User ${req.params.userId} not found`});
        }
    }
    async extractUserId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.userId;
        next();
    }
}
