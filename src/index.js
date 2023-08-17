import { input } from '@inquirer/prompts';
import { SocketManager } from './libs/SocketDistributedSystem.js';

const Terminal = {
  manager: null,
  init: async () => {
    Terminal.manager = new SocketManager();
    const serverPort = await input({ message: 'Enter server port:' });
    await Terminal.manager.serve(+serverPort, (id, message) => console.log(`S: ${id}: ${message}`));

    const clientPort = await input({ message: 'Enter client port:' });
    await Terminal.manager.connect(+clientPort, (id, message) => console.log(`C: ${id}: ${message}`));

    while (true) {
      const message = await input({ message: '' });
      Terminal.manager.send(message);
    }
  }
}

Terminal.init();