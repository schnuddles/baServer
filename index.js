const express = require('express');
const app = express();
const socket = require('socket.io');

const server = app.listen(3000);
const io = socket(server);

// Die Funktion, die den Code für die Verarbeitung der eingehenden Nachrichten enthält
function handleIncomingMessages(socket, headline, copy) {
  console.log('New connection: ' + socket.id);
  socket.emit('headline', headline);
  socket.emit('copy', copy);
}

// Socket-Verbindung herstellen
io.sockets.on('connection', (socket) => {
  handleIncomingMessages(socket);
});

// Route für den Endpunkt '/sketch'
app.get('/sketch', (req, res) => {
    let copyMsg = 'Das ist ein Copytext';
    let headlineMsg = 'Das ist eine Headline';
    io.on('connection', (socket)=> {
        handleIncomingMessages(socket, headlineMsg, copyMsg); // die Funktion wird auch hier aufgerufen
    });
    res.sendFile(__dirname + '/sketch/index.html');
});

// Statisches Verzeichnis 'sketch' bereitstellen
app.use(express.static('sketch'));
