import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import  'dotenv/config'

const app = express()
console.log()
// middelware
app.use(cors())

const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors: {
        // Origine de notre rendu coté client
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

io.on("connection", (socket) => {
    console.log(socket.id)
    
    socket.on('join_room', (data) => {
        socket.join(data)
    })

    socket.on('send_message', (data) => {
        // socket.broadcast.emit('receive_message', data)
        socket.to(data.room).emit('receive_message', data)
    })
  });
  

httpServer.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))