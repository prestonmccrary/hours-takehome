const Session = require('../models/Session')

module.exports = class SessionService{

    constructor(sessions){
        this.sessions = sessions;
    }

     addUserToSession = (username, sessionUUID) => {

        const inMemorySession = this.sessions[sessionUUID]

        if(inMemorySession){
            this.sessions[sessionUUID] = [...inMemorySession, username]
        } else {
            this.sessions[sessionUUID] = [username]
        }

        console.log(this.sessions[sessionUUID])
    }
    
     removeUserFromSession = (username, sessionUUID) => {
        const participants = this.sessions[sessionUUID]
        this.sessions[sessionUUID] = participants.filter(person => person != username)
        // console.log(this.sessions[sessionUUID])
    }
    
     ableToJoin = async (sessionUUID) => {
         console.log(sessionUUID)
        try{
            const session = await Session.findOne({smallId: sessionUUID})
            if(!session || session.status == "FINISHED"){
                return false
            } else {
                return session
            }
        } catch(err){
            console.log(err)
            throw new Error("Server error")
        }
    }
    
    addMessageToChatHistory = async (msg, sessionUUID) => {
        try{
            const session = await Session.findOne({'smallId': sessionUUID})
            session.chatlog.push({
                ...msg,
                time: Date.now(),
                
            })
            session.save()
        } catch (err) {
            console.log(err)
            throw new Error("Server error")
        }
    }
    
    getParticipantsOfSession = (sessionUUID) => {
        return this.sessions[sessionUUID]
    }

}


