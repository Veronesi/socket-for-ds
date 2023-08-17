import http from 'node:http';
import { Server } from "socket.io";
import io from 'socket.io-client';
import crypto from 'node:crypto';
import { EVENT } from '../configs/constants.js';

class Message {
  id;
  message;  
}

export class SocketManager {
  server;
  client;
  constructor() {}
  async serve(port, onreciebe = (id, message) => {}) {
    this.server = new SocketServer(onreciebe);
    await this.server.on(port);
  }
  async connect(port, onreciebe = (id, message) => {}) {
    this.client = new SocketClient(onreciebe);
    await this.client.connect(port);
  }
  async send(message) {
    const uuid = crypto.randomUUID({disableEntropyCache : true});
    console.log(`Send to "${this.client.socket.id}", ${uuid}: ${message}`)
    this.client.send(JSON.stringify({ message, uuid }));
  }
}

export class SocketServer {
  io;
  socket;
  server;
  constructor(onreciebe = () => {}) {
    this.server = http.createServer();
    this.socket = null;

    this.io = new Server(this.server);
    this.io.on('connection', (socket) => {
      this.socket = socket;
      socket.on(EVENT.MESSAGE, (msg) => {
        let json = {};
        try {
          json = JSON.parse(msg);
          if(!(json.message && json.uuid)) {
            throw new Error("message format is invalid");
          }
        } catch (error) {
          console.log(error.message);
        }
        if(!json) {
          return;
        }

        onreciebe(socket.id, json.message);
        socket.emit(EVENT.ACK, json.uuid);
      });
    });
  }
  async on(port = 3000) {
    // this.io.listen(+port);
    return new Promise((resolve) => {
      this.server.listen(+port, () => {
        console.log("Server run on port", port);
        resolve();
      })
    })
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
  onreciebe;
  constructor(onreciebe = () => {}) {
    this.onreciebe = onreciebe;
  }
  async connect(port = 3001) {
    this.socket = io.connect(`http://localhost:${+port}`);

    this.socket.on(EVENT.ACK, (message) => {
      console.log('ACK:', message);
    });

    this.socket.on(EVENT.MESSAGE, (message) => {
      this.onreciebe(this.socket.id, message);
      // console.log(`Message for ${this.socket.id}: ${message}`);
    });

    return new Promise((resolve) => {
      this.socket.on('connect', () => {
        console.log('Server connection succesfully');
        resolve();
      });
    })
  }
  send(message = "") {
    if(!this.socket) {
      console.log("no server connect");
      return;
    }
    this.socket.emit(EVENT.MESSAGE, message);
  }
}