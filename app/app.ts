import express from 'express';
import bodyParser from "body-parser";
import * as http from 'http';

import {CommonRoutesConfig} from './common/common.routes.config';
import {UsersRoutes} from './users/users.routes.config';
import {AuthRoutes} from './auth/auth.routes.config'

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes: any = [];
routes.push(new UsersRoutes(app));
routes.push(new AuthRoutes(app));

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(`Server running at port ${port}`)
});

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
    routes.forEach((route: CommonRoutesConfig) => {
        console.log(`Routes configured for ${route.getName()}`);
    });
});

export default app;
