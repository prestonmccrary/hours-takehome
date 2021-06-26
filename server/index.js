const express = require('express')
const socketio = require('socket.io')
const cors = require('cors')
const chat = require('./io/chat')
const connection = require('./db')
const apiRoutes = require('./api')
const app = express()

// grabbing config
const PORT = 4000 || process.env.PORT

// middleware
app.use(cors())
app.use(express.json())

// api
app.use("/", apiRoutes);

const server = app.listen(PORT, (err) => console.log(err ? err : "Listening on port " + PORT))

// Small in memory storage for sessions, large scale application would need redis
// Sessions will be stored in the following way:
// sessions[sessionId] -> [name1, name2, name3,...] 
// Each session id maps to an array of people in a room
const SessionService = require('./services/SessionService')
const sessions = {} 
const sessionService = new SessionService(sessions)

const io = socketio(server, {cors: {origin:'*', methods: ["GET", "POST"]}})
chat(io,sessionService);