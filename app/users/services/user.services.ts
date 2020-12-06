import {UsersDao} from "../daos/user.dao";

export class UsersService {

    private static instance: UsersService;
    dao: UsersDao;

    constructor() {
        this.dao = UsersDao.getInstance();
    }
    static getInstance(): UsersService {
        if (!UsersService.instance) {
            UsersService.instance = new UsersService();
        }
        return UsersService.instance;
    }

    async create(resource: any) {
        return this.dao.addUser(resource);
    }

    async deleteById(resourceId: any) {
        return this.dao.removeUserById(resourceId);
    };

    async list(limit: number, page: number) {
        return this.dao.listUsers(limit, page);
    };

    async patchById(resource: any) {
        return this.dao.patchUser(resource)
    };

    async readById(resourceId: any) {
        return this.dao.getUserById(resourceId);
    };

    async getByEmail(email: string) {
        return this.dao.getUserByEmail(email);
    }
}
