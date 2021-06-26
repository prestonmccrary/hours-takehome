import Message from "./Message"
import ChatBox from "./ChatBox"

import { getName } from "../services/login"

import styles from '../styles/ChatWindow.module.scss'

const ChatWindow = ({ sessionState, setSessionState, chatService}) => {

    return(
        <div className={styles.chatWindow}>
        <div id="msgContainer" className={styles.msgContainer}>
            {sessionState && sessionState.chatHistory.map((msg, i) => {
                let previousFromSameAuthor = i != 0 && sessionState.chatHistory[i-1].username == msg.username
                return(<>
                    <Message styles={styles} message={msg} key={i} isMyMessage={ msg.fromMe || msg.username == getName()} previousFromSameAuthor={previousFromSameAuthor}/>
                </>)
            })}
        </div>
        
            <ChatBox
                sessionState={sessionState}
                onChange={e => setSessionState({...sessionState, msg: e.target.value})}
                onKeyPress={e => {
                    if(e.key == 'Enter'){
                        chatService.sendMessage(sessionState.msg)
                    }
                }}
                styles={styles}
            />
    </div>
    )
}

export default ChatWindow