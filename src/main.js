import 'dotenv/config';
import { startServer } from './server.js';
import { createAplication } from './setup.js';

async function server() {
  const app = await createAplication();
  await startServer(app);
}

void server();
