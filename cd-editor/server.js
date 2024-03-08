const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


io.on("connection", (socket)=>{
    console.log('Socket Connected', socket.id);
})


const PORT = process.env.PORT || 5000;
http.listen(PORT, ()=> console.log(`Listning to the Port ${PORT}`));