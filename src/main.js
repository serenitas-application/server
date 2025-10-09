import 'dotenv/config';
import { startServer } from './server.js';
import { setupApplication } from './setup.js';

async function server() {
  const app = await setupApplication();
  await startServer(app);
}

void server();
