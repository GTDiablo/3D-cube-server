const express = require('express');
const app = express();

const cors = require('cors');
const { Server } = require("socket.io");
//
const IOManager = require('./io-manager');

const PORT = process.env.PORT || 8000;

const ioManager = new IOManager();

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.json({message: '3D Cube goes BRRRRRRR....'})
});

app.post('/user-survey', (req, res)=> {
    console.log('User filled survey:', req.body);
    res.json({
        message: 'Saved user data!'
    })
});


const server = app.listen(PORT, ()=> {
    console.log(`Listening for connection on port ${PORT}...`);
});

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});


// TODO: Only accept one connection
io.on('connection', (socket) => {
    console.log('Client connected');

    ioManager.onLocalChange((localNodeChange)=> {
        socket.emit('cube-change-server', localNodeChange)
    });

    socket.on('cube-change-web', (node)=> {
        ioManager.nodeChange(node);
    });

  });
