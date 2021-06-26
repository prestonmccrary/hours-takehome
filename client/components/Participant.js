import React from 'react'
import {motion} from 'framer-motion';
import styles from '../styles/Participant.module.scss'


const Participant = ({person}) => {
    return(
        <motion.div whileHover={{y: -2}} className={styles.participantContainer}>
            <div className={styles.participantAvatar}>
                <p>{person[0]}</p>
            </div>
            <p style={{marginLeft: '15px'}}>{person}</p>
        </motion.div>
    )
}

export default Participant