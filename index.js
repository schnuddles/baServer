const express = require('express');
const app = express();
const socket = require('socket.io');

const server = app.listen(3000);

const io = socket(server);
io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log('New connection: ' + socket.id);
  // hier können Sie den Code für die Verarbeitung der eingehenden Nachrichten schreiben
  socket.emit('headline', 'Überschrift');
  socket.emit('copy', 'Copytext');
}

const quarterCircle = express.static('sketch');

app.get('/sketch', (req, res)=>{
    app.use(quarterCircle);
})

app.use(quarterCircle);



