import express, { RequestHandler } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { router as userRouter } from './routes/userRoutes';
// import bodyParser from 'body-parser';

const app = express();

app.enable('trust proxy');

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.options('*', cors());

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/chat-application/user', userRouter);

app.get('/', (req, res) => {
  res.send('Homes');
});

export default app;
