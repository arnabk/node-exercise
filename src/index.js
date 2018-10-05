import express from 'express';
import bodyParser from 'body-parser';
import peopleRoute from './people-route';
import planetsRoute from './planets-route';

const app = express();

app.use(bodyParser.json());

app.use('/people', peopleRoute);
app.use('/planets', planetsRoute);

export default app.listen(3000, () => console.log('Server started successfully at port 3000'));
