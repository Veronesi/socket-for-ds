import { SocketClient } from './libs/SocketDistributedSystem.js';

const client = new SocketClient(3000);

setTimeout(() => {
  client.send("hola capo");
}, 100);