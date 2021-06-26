# Hours Take Home

[Live App](https://hours-takehome.vercel.app/)

## What I did above and beyond the spec in < 24 hours.

- Chat Functionality
  - Persistent chat history with the use of MongoDB
    - Allows for users to refresh their page without losing all of chat
    - Opens the door for moderation of chat sessions as messages are stored with author names and timestamps
  - Report feature that allows users to "report" a session, which flags it in the database
  - Discord like auto-scroll down feature when a new message is sent
- Server side verification of available rooms
  - We don't want users to be able to join any room they want, only ones that

## Development Run Instructions

Clone into any directory

```
git clone https://github.com/prestonmccrary/hours-takehome prestons-project
```

Start our Next.JS server

```
cd prestons-project/client
yarn
npm run dev
```

Start our Socket.io and Express backend

```
cd prestons-project/server
npm i
npm run dev
```

### We're done!
Our backend will be running on localhost:4000, and our next server will be on localhost:3000.





