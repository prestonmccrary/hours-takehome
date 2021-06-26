import React from 'react'
import styles from "../styles/Message.module.scss"
import styles2 from "../styles/Participant.module.scss"

const Message = ({message, isMyMessage, previousFromSameAuthor}) => {

    return(
        <div className={styles.msgWrapper}style={{alignSelf: isMyMessage  ? 'flex-end' : 'flex-start', flexDirection: isMyMessage ? 'row-reverse' : 'row'}}>
            <div className={styles2.participantAvatar} style={{visibility: previousFromSameAuthor && 'hidden'}}>
                <p>{message.username ? message.username[0] : 'bru'}</p>
            </div>
            <div 
                className={styles.msg} 
                style={{
                    background: isMyMessage ? '#1890ff' : 'white',
                    color: isMyMessage ? 'white' : 'black',
                    margin: '0px 10px'
                }}

            >
                {message.message}
            </div>
        </div>
    )
}

export default Message