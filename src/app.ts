import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';
import flash from 'connect-flash';
import helmet from 'helmet';
import csrf from 'csurf';

import appProtocol from './interfaces/appProtocol';

import ErrorsMiddlewares from './middlewares/ErrorsMiddlewares';
import routes from './routes/routes';

class App implements appProtocol {
    private app = express();

    private url = 'http://localhost';

    private port = 3333;

    private initUsed = false;

    constructor() {
        dotenv.config();
    }

    public init(): void {
        this.setup();
        this.middlewares();
        this.routes();
        this.initUsed = true;
    }

    public start(): void {
        console.log('Booting');

        if (!this.initUsed) throw new Error('The "init" method is expected to be called.');
        this.conectDatabase();

        const url = this.app.get('url');
        const port = this.app.get('port');

        this.app.on('connected_DB', () => {
            this.app.listen(port, () => {
                console.log(`Running: "${url}:${port}/"`);
            });
        });
    }

    private setup(): void {
        this.app.set('views', 'frontend/views');
        this.app.set('view engine', 'ejs');

        this.app.set('url', process.env.URL || this.url);
        this.app.set('port', process.env.PORT || this.port);
    }

    private middlewares(): void {
        this.app.use(session({ secret: 'dfgkJSHEdrieiuSedfii', resave: false, saveUninitialized: false }));
        this.app.use(flash());
        this.app.use(helmet());
        this.app.use(csrf());
        this.app.use(express.static('public'));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(ErrorsMiddlewares.csrf);
    }

    private routes(): void {
        this.app.use(routes);
    }

    private conectDatabase(): void {
        console.log('Connecting to MongoDB...');
        mongoose.set('useUnifiedTopology', true);

        const con = process.env.DB_HOST as string;
        const cluster = process.env.DB_CLUSTER as string;
        const database = process.env.DB_DATABASE as string;
        const user = process.env.DB_USERNAME as string;
        const password = process.env.DB_PASSWORD as string;

        const uri = con
            .replace('<cluster>', cluster)
            .replace('<database>', database)
            .replace('<user>', user)
            .replace('<password>', password);

        mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (!err) {
                console.log('MongoDB connection established');
                this.app.emit('connected_DB');
            } else {
                console.log(`Error in DB connection: ${err}`);
            }
        });
    }
}

export default new App();
