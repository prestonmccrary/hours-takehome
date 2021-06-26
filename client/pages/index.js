import {useRef, useState} from 'react'
import styles from '../styles/Join.module.scss'
import styles2 from '../styles/Participant.module.scss'

import { useRouter } from 'next/router'
import Head from 'next/head'
import { useEffect } from 'react'
import { isLoggedIn, login, getName } from '../services/login'

import { useToasts } from 'react-toast-notifications';

import axios from 'axios'

import FInput from '../components/FInput'


export default function Join() {

    const router = useRouter()

    const { addToast } = useToasts(); 

    const [name, setName] = useState('')
    const [sessionName, setSessionName] = useState('')
    // loggedIn is needed as isLoggedIn() isn't available at compile 
    // time because next uses SSR (this is because isLoggedIn() used localStorage)
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {

      if(isLoggedIn()){
        setLoggedIn(true)
      }

    }, [])

    const handleCreation = async () => {
      if(name){
        login(name);
      }

      try{
        console.log(`${process.env.API}/session`)
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/session`, {sessionName, creatorName: getName()})
        
        router.push(`/session/${data.smallId}`)

      } catch (err) {
        addToast("Server Error", {appearance: 'error'})

      }
    }

    const handleKeyPress = (e) => {
      if(e.key == "Enter"){
        if(!isLoggedIn() && !name){
          addToast("You must have a name", {appearance: 'error'})
        } else {
          handleCreation()
        }
      }
    }


  return (
    <div className={styles.mainContainer}>

      <Head>
        <title>Hours Takehome</title>
      </Head>

            <div className={styles.card} style={{height: '400px', position: 'relative'}}>

      <h2 style={{marginTop:'10px', textAlign: 'center'}}>Start Session</h2>

        <div className={styles2.participantAvatar} style={{position: 'absolute', top: '15px', right: '15px'}}>
          <p>{loggedIn ? getName().substring(0,1) : name?.length > 0 ? name[0] : '?'}</p>
        </div>

        {!loggedIn && 
          <FInput
            placeholder="Your Name" 
            value={name}
            onChange={e => setName(e.target.value)}
            style={{margin:'5px 0px'}}
            onKeyPress={handleKeyPress}
          />
      }

      <FInput
          placeholder="Session Name" 
          value={sessionName}
          onChange={e => setSessionName(e.target.value)}
          style={{margin:'5px 0px'}}
          onKeyPress={handleKeyPress}
      />


      </div>
    </div>
  )
}
