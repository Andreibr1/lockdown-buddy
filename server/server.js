const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require("http");
const websocket = require("ws");
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('port', 5000);

app.get('/', async (req, res) => {
    res.render("pages/index");
});
// chat page
app.get('/chat', function(req, res) {
  res.render('pages/chat');
});

const server = http.createServer(app);

const wss = new websocket.WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
    ws.on('message', (message) => {
        ws.send(`You said: ${message.toString()}`);
    });
});

server.listen(5000, () => {
    console.log(`Server started on port ${server.address().port}`);
});
