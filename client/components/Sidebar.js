import React from 'react'
import styles from "../styles/Sidebar.module.scss"

const Sidebar = ({title, children}) => {

    return(
        <div className={styles.sideBar} >

            <h2>{title}</h2>

            {children}

        </div>
    )
}

export default Sidebar