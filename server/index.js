const express = require('express')
const massive = require('massive')
const {json} = require('body-parser')
require('dotenv').config()
const session = require('express-session')
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env
const authCtrl = require('./controllers/authController')
const ctrl = require('./controllers/controller')

const app = express()

app.use(json())

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))


//auth endpoints
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)
app.get('/auth/user', authCtrl.getUser)

//header endpoint
app.get('/api/username/:id', ctrl.getUsername)

//search component endpoints
app.get('/api/patients/:id', ctrl.getUserPatients)
app.get('/api/patient/:id')

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then((dbInstance) => {
    app.set('db', dbInstance)
    console.log('db connected')
    app.listen(SERVER_PORT, () => {
        console.log(`Server listening on port ${SERVER_PORT}`)
    })
})