import { input, select } from '@inquirer/prompts';
import { SocketManager } from './libs/SocketDistributedSystem.js';

const Terminal = {
  manager: null,
  init: async () => {
    const protocol = await select({
      message: 'Select some Procolol',
      choices: [
        {
          name: 'De dos mensajes o vías',
          value: '2',
        },
        {
          name: 'De tres mensajes',
          value: '3',
        },
        {
          name: 'De cuatro mensajes',
          value: '4',
        },
      ],
    });

    Terminal.manager = new SocketManager(protocol);
    const serverPort = await input({ message: 'Enter server port:' });
    await Terminal.manager.serve(+serverPort, (uuid, message) => {
      console.log(`New message: ${message} (${uuid})`);
      return 'pong';
    });

    const clientPort = await input({ message: 'Enter client port:' });
    await Terminal.manager.connect(+clientPort, (id, msg) => console.log(`Response: ${msg.message} (${msg.uuid})`));

    while (true) {
      const message = await input({ message: '' });
      Terminal.manager.send(message);
    }
  }
}

Terminal.init();