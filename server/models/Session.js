const mongoose = require('mongoose')

const SessionSchema = new mongoose.Schema({
    status:{
        type: String,
        enum: ['IN-PROGRESS', 'FINISHED'],
        default: 'IN-PROGRESS'
    },
    sessionName:{
        type: String,
        required: true
    },
    creatorName: {
        type: String,
        required: true
    },
    smallId: {
        type: String,
        required: true
    },
    chatlog: [
            {
                message: {type: String},
                time: {type: Date},
                username: {type: String}
            },
        ],
    reported: {
        type: Boolean,
        default: false
    }
    

})

module.exports = mongoose.model('Session', SessionSchema)