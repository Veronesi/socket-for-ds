# sokcet-for-ds

### Run Project
- Install Node
- Clonse repo `git clone https://github.com/Veronesi/socket-for-ds.git`
- Install dependences `cd socket-for-ds && npm i --yes`
- Run Project `npm run start`

### Ejemplo del protocolo de dos mensajes
```
Servidor 1:
? Select some Procolol: De dos mensajes o vías
? Enter server port: 3000
? Enter client port: 3001

Request: testing (88cf69bd-afe0-43cd-8643-ac9df833b516)
Response: pong (88cf69bd-afe0-43cd-8643-ac9df833b516)

Servidor 2:
? Select some Procolol: De dos mensajes o vías
? Enter server port: 3001
? Enter client port: 3000

New message: testing (88cf69bd-afe0-43cd-8643-ac9df833b516)
```

### Ejemplo de protocolo de tres mensajes
```
Servidor 1:
? Select some Procolol: De tres mensajes
? Enter server port: 3000
? Enter client port: 3001

Request: testing (cb1a0c9e-f9f3-4151-8be8-3eaeb67d138c)
ACK (cb1a0c9e-f9f3-4151-8be8-3eaeb67d138c)
Response: pong (cb1a0c9e-f9f3-4151-8be8-3eaeb67d138c)

Servidor 2:
? Select some Procolol: De tres mensajes
? Enter server port: 3001
? Enter client port: 3000

New message: testing (cb1a0c9e-f9f3-4151-8be8-3eaeb67d138c)
```

### Ejemplo de protocolo de cuatro mensajes
```
Servidor 1:
? Select some Procolol: De cuatro mensajes
? Enter server port: 3000
? Enter client port: 3001

Request: testing (6ca2b4ed-5a2e-4373-b31c-63c62d3ae484)
ACK (6ca2b4ed-5a2e-4373-b31c-63c62d3ae484)
Response: pong (6ca2b4ed-5a2e-4373-b31c-63c62d3ae484)

Servidor 2:
? Select some Procolol: De cuatro mensajes
? Enter server port: 3001
? Enter client port: 3000

New message: testing (6ca2b4ed-5a2e-4373-b31c-63c62d3ae484)
ACK_RESPONSE (6ca2b4ed-5a2e-4373-b31c-63c62d3ae484)
```
