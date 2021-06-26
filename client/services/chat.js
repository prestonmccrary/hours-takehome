export default class ChatService {



    constructor(sessionUUID, username, socket, setSessionState){
        this.sessionUUID = sessionUUID
        this.username = username
        this.socket = socket
        this.setSessionState = setSessionState
    }
    
    turnOff = () => {
        console.log('turningOff')
        this.socket.emit('leave_session', {
            username: this.username,
            sessionUUID: this.sessionUUID
        })
        this.socket.disconnect();
    }

    report = () => {
        console.log('r')
        this.socket.emit("report_session", {sessionUUID: this.sessionUUID})
    }

    joinSession = (errorFunc) => {
        this.socket.emit("join_session", {sessionUUID: this.sessionUUID, username: this.username}, (data) => {
            console.log(data)
            if(data.err){
                return errorFunc()
            }
            const {currentParticipants, chatHistory, sessionName} = data
            this.setSessionState({chatHistory, currentParticipants, msg: '', sessionName}) 
            return true
        })
    }

    sendMessage = (message) => {
        
        this.addMessage({message, fromMe: true, username: this.username})
        this.setSessionState(s => {
            return {...s, msg: ''}
        })
        this.socket.emit('send_message', {
            username: this.username,
            message,
            sessionUUID: this.sessionUUID,
        })


    }

    scrollToLastMessage = () => {
        if( document.getElementById("msgContainer")?.lastChild){
            document.getElementById("msgContainer").lastChild.scrollIntoView()
        }
    }

    on = (event, func) => {
        this.socket.on(event, func);
    }

    getSocket = () => {
        return this.socket
    }

    addMessage = (message) => {
        this.setSessionState(s => {
            return {...s, chatHistory: [...s.chatHistory, message]}
        })
    }

    addParticipant = (username) => {
        this.setSessionState(s => {
            return {...s, currentParticipants: [...s.currentParticipants, username]}
        })
    }

    removeParticipant = (username) => {
        this.setSessionState(s => {
            let temp = s.currentParticipants
            return {...s, currentParticipants: temp.filter(person => person != username)}
        })
    }

    

}