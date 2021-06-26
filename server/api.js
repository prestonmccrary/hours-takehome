const express = require('express')
const uuid4 = require('uuid4')
const Session = require('./models/Session')

const router = express.Router()


router.get("/", (req, res) => {
    return res.send("This is a test route")
})


router.post("/session", async (req, res) => {

    const {creatorName, sessionName} = req.body

    try {
        const session = await Session.create({creatorName, sessionName, chatHistory: [], smallId: uuid4() })

        return res.json(session).status(200)
    } catch(err) {
        console.log(err)
        res.status(500)
        return res.send("Server Error")
    }
    
})

module.exports = router;