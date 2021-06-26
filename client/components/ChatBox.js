import React from 'react'
import {motion} from 'framer-motion'
import styles from '../styles/ChatBox.module.scss'


const ChatBox = ({ sessionState, onChange, onKeyPress}) => {

    return(
        <motion.input 
            whileHover={{y: '-5px'}} 
            placeholder="Message" 
            className={styles.msgInputBox}
            value={sessionState.msg}
            onChange={onChange}
            onKeyPress={onKeyPress}
        />
    )
}

export default ChatBox