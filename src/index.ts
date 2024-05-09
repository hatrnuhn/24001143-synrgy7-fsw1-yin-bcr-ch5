import express from 'express';
import router from './routes';
import { printRequest } from './middlewares/utils';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded( { extended: false } ));

app.use('/api', printRequest, router);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));