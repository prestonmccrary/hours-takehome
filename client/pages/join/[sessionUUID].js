import {useRef, useState} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Join.module.scss'

import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { isLoggedIn, login } from '../../services/login'

import { useToasts } from 'react-toast-notifications';



export default function Join() {

    const router = useRouter()

    const { addToast } = useToasts(); 

    const [name, setName] = useState('')


    const {sessionUUID} = router.query

    useEffect(() => {

        // already logged in individuals don't need to re-enter name
        if(isLoggedIn()){
            router.push(`/session/${sessionUUID}`)
        }



    })

    const handleLogin = () => {
      login(name);
      router.push(`/session/${sessionUUID}`)
    }


  return (
    <div className={styles.mainContainer}>

      <Head>
        <title>Join Session</title>
      </Head>

      <div className={styles.card}>
        <h3>Enter your name to join</h3>
        <input 
          placeholder="Name" 
          value={name}
          onChange={e => setName(e.target.value)}
          className={styles.nameInput}
          onKeyPress={e => {
            if(e.key == "Enter"){
              try{
                handleLogin()
              } catch (err) {
                addToast(err.message, {appearance: 'error', placement: 'bottom-center' })
              }
            }
          }}
        />


      </div>
    </div>
  )
}
