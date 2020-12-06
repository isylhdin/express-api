import {MongooseService} from '../../common/services/mongoose.service';
import * as shortUUID from "short-uuid";

export class UsersDao {
    mongooseService: MongooseService = MongooseService.getInstance();
    private static instance: UsersDao;

    Schema = this.mongooseService.getMongoose().Schema;

    userSchema = new this.Schema({
        _id: String,
        name: String,
        email: String,
        description: String,
        password: String,
        permissionLevel: Number
    });

    mongoService = this.mongooseService.getMongoose().model('Users', this.userSchema);


    constructor() {
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new UsersDao();
        }
        return this.instance;
    }

    async addUser(userFields: any) {
        userFields._id = shortUUID.generate();
        const user = new this.mongoService(userFields);
        await user.save();
        return userFields._id;
    }

    async getUserByEmail(email: string) {
        return this.mongoService.findOne({email: email});
    }

    async removeUserById(userId: string) {
        await this.mongoService.deleteOne({_id: userId});
    }

    async getUserById(userId: string) {
        return this.mongoService.findOne({_id: userId});
    }

    async listUsers(limit: number = 25, page: number = 0) {
        return this.mongoService.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    }

    async patchUser(userFields: any) {
        let user: any = await this.mongoService.findById(userFields._id);
        if(user){
            for (let i in userFields) {
                user[i] = userFields[i];
            }
            return await user.save();
        }
    }
}
