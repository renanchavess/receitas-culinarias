import express, { Application } from 'express';
import dotenv from 'dotenv';
import { routes } from './Routes';
import { container } from './ContainerInjection';
import { createCorsMiddleware } from './main';
dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(createCorsMiddleware());

container;

app.use(routes);

app.listen(PORT, (): void => {
  console.log(`Server running on port ${PORT}`);
});