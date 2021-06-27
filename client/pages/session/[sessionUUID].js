import {useEffect, useRef, useState} from 'react'
import styles from '../../styles/Session.module.scss'
import { useRouter } from 'next/router'
import { useToasts } from 'react-toast-notifications'

import {io} from 'socket.io-client'

import ChatService from '../../services/chat'
import {getName, isLoggedIn} from '../../services/login'

import Sidebar from '../../components/Sidebar'
import Participant from '../../components/Participant'
import ChatWindow from '../../components/ChatWindow'
import ClipboardButton from '../../components/ClipboardButton'
import ReportButton from '../../components/ReportButton'

import Head from 'next/head'




export default function Session() {

    const router = useRouter()
    const {sessionUUID} = router.query

    const chat = useRef();
    const [sessionState,setSessionState] = useState(null)

    const toast = useToasts()

    
    //TODO refactor setupChat into chat service method
    const setupChat = () => {

        chat.current = new ChatService(sessionUUID, getName(), io(process.env.NEXT_PUBLIC_API_URL), setSessionState)

        const worked = chat.current.joinSession(() => {
            toast.addToast('Session unavailable', {appearance: 'error', autoDismiss: ''})
            router.push("/")
        })
      

        chat.current.on("incoming_message", (message) => {
            chat.current.addMessage(message);
            chat.current.scrollToLastMessage()
        })

        chat.current.on("other_join", (payload) => {
            chat.current.addParticipant(payload.username)
            toast.addToast(`${payload.username} joined!`, {appearance: 'info', autoDismiss: false})
            
        })

        chat.current.on("other_leave", (payload) => {
            chat.current.removeParticipant(payload.username)
            toast.addToast(`${payload.username} left!`, {appearance: 'info', autoDismiss: false})
        })
    }

    useEffect(() => {
        
        if(chat.current == null && sessionUUID){
            if(isLoggedIn()){
                setupChat()
            } else {
                router.push(`https://https://hours-takehome.vercel.app/join/${sessionUUID}`)
            }
        }
    }, [router])


    useEffect(() => {

        if(chat.current != null){
            chat.current.scrollToLastMessage()
        }

    }, [sessionState])

    return (
        <div className={styles.mainContainer}>
            {sessionState && 
                <>
                    <Head>
                        <title>{sessionState.sessionName}</title>
                    </Head>

                    <Sidebar styles={styles} title={
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer'}}>
                            {sessionState.sessionName}
                            <div style={{display:'flex', justifyContent:'flex-end'}}>
                                <ClipboardButton toast={toast} textToCopy={`https://hours-takehome.vercel.app/join/${sessionUUID}`}/>
                                <ReportButton toast={toast} chatService={chat.current}/>
                            </div>
                            

                        </div>
                    }>  
                        <div style={{marginTop: "90px"}}>
                          
                          <p>(timer and task ui would go here)</p>

                        </div>
                       
                    </Sidebar>


                   <ChatWindow
                        styles={styles}
                        sessionState={sessionState}
                        setSessionState={setSessionState}
                        chatService={chat.current}
                   />

                    <Sidebar title={"Participants"} styles={styles}>
                        {sessionState && sessionState.currentParticipants.map((person, i) => {
                            return(
                                <Participant person={person} key={i} styles={styles}/>
                            )
                        })}
                    </Sidebar>

                </>
            }
        </div>
    )
}
