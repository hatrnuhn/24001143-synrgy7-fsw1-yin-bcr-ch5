import express from 'express';
import router from './routes';
import { printRequest } from './middlewares/utils';
import dotenv from 'dotenv';
import path from 'path';
import { knexSnakeCaseMappers, Model } from 'objection';
import knex from 'knex';
import config from './knexfile';

dotenv.config();

const environment = process.env.NODE_ENV || 'development';
const connection = process.env.POSTGRES_URL;

Model.knex(knex({...config[environment as keyof typeof config], connection, ...knexSnakeCaseMappers()}));

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded( { extended: false } ));

app.use('/api', printRequest, router);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));