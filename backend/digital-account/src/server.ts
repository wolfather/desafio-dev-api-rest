
import { App } from './app/app';
import * as dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT;

const server = new App();

server.app.listen(PORT, () => console.log(`APP IS RUNNING ON ${PORT}`))