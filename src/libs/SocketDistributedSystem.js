import http from 'node:http';
import { Server } from "socket.io";
import io from 'socket.io-client';
import { EVENT } from '../configs/constants.js';

class Message {
  id;
  message;  
}

export class SocketServer {
  io;
  socket;
  constructor(port = 3000) {
    const server = http.createServer();
    this.socket = null;

    this.io = new Server(server);
    this.io.on('connection', (socket) => {
      this.socket = socket;
      socket.on(EVENT.MESSAGE, (msg) => {
        console.log(socket.id, msg);
        socket.emit(EVENT.ACK, msg);
      });
    });
    this.io.listen(port, () => {
      console.log('socket on port ', port);
    });
  }
  send(message) {
    if(!this.socket) {
      console.log("no client connect");
      return;
    }
    this.socket.emit(EVENT.MESSAGE, message);
  }
}

export class SocketClient {
  socket;
  constructor(port = 3001) {
    this.socket = io.connect("http://localhost:"+port)

    // Escuchar eventos del servidor
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
    });

    this.socket.on(EVENT.ACK, (message) => {
      console.log('ACK:', message);
    });

    this.socket.on(EVENT.MESSAGE, (message) => {
      console.log('Mensaje del servidor:', message);
    });
  }
  send(message = "") {
    console.log("try to send message:", message);
    if(!this.socket) {
      console.log("no server connect");
      return;
    }
    this.socket.emit(EVENT.MESSAGE, message);
  }
}