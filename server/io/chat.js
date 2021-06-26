const Session = require('../models/Session')


module.exports = (io, sessionService) => {

    const idToRoomAndName = {}

    io.on("connection", (client) => {



        client.on("send_message", async (payload) => {
            
            const {message, sessionUUID, username} = payload

            sessionService.addMessageToChatHistory({message,username}, sessionUUID)

            console.log(`${username} send "${message}"  (${sessionUUID})`)

            client.to(sessionUUID).emit("incoming_message", {message, username})
        })

        client.on("report_session", async (payload) => {
            // implement report logic
        })

        client.on("join_session", async (payload, cb) => {

            const {sessionUUID, username} = payload

            console.log(payload)

            try{

                const sessionIfAvailable = await sessionService.ableToJoin(sessionUUID)

                if(!sessionIfAvailable){
                    cb({err: "You can't join this session"})
                    return;
                }

                const session = await Session.findOne({smallId: sessionUUID})

                idToRoomAndName[client.id] = payload
                sessionService.addUserToSession(username, sessionUUID)
                client.join(sessionUUID)
                client.to(sessionUUID).emit("other_join", {username})

                cb({
                    currentParticipants: sessionService.getParticipantsOfSession(sessionUUID),
                    chatHistory: session ? session.chatlog : [],
                    sessionName: session.sessionName
                })


            } catch(err){
                console.log(err)
                cb({err: err.message})

            }

        })

        client.on("disconnect", () => {

            if(idToRoomAndName[client.id]){
                
                const {sessionUUID, username} = idToRoomAndName[client.id]
                sessionService.removeUserFromSession(username, sessionUUID)
                client.to(sessionUUID).emit("other_leave", {username})

                console.log(`${username} left (${sessionUUID})`)

            }
        })

    })



}