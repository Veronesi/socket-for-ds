import { SocketServer } from './libs/SocketDistributedSystem.js';

const server = new SocketServer(3000);

setTimeout(() => {
  server.send("sigues conectado?");
}, 3000);