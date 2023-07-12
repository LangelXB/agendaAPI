import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import SwaggerUi from 'swagger-ui-express';
import swagger from './swagger';
import routerIndex from '../shared/index.Routes';

const app = express();

// Midlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/documentation', SwaggerUi.serve, SwaggerUi.setup(swagger));
app.use(routerIndex);

export default app;
