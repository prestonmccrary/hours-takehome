const mongoose = require('mongoose')
const dotenv = require('dot-env')
dotenv.config()
const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.on('open', () => console.log("Mongo connected"))

module.exports = mongoose.connection