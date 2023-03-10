
import { App } from './app/app';

const PORT = 3000;
const server = new App();

server.app.listen(PORT, () => console.log(`APP IS RUNNING ON ${PORT}`))