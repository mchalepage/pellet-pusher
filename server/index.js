const express = require('express')
const massive = require('massive')
require('dotenv').config()
const session = require('express-session')
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env
const authCtrl = require('./controllers/authController')
const ctrl = require('./controllers/controller')
const path = require('path')

const app = express()

app.use(express.json())

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30
    }
}))


//auth endpoints
app.post('/auth/register', authCtrl.registerUser)
app.post('/auth/login', authCtrl.loginUser)
app.delete('/auth/logout', authCtrl.logoutUser)
app.get('/auth/user', authCtrl.getUser)

//search component endpoints
app.get('/api/patients', ctrl.getPatients)

//patient endpoints
app.get('/api/patient/:patient_id', ctrl.getPatient)
app.post('/api/patient', ctrl.addPatient)
app.put('/api/patient/:patient_id', ctrl.updatePatient)
app.delete('/api/patient/:patient_id', ctrl.deletePatient)

//get patient's visits endpoint
app.get('/api/patient/:patient_id/visits', ctrl.getPatientVisits)
app.get('/api/patient/:patient_id/visit/:visit_id', ctrl.getPatientVisit)
app.post('/api/patient/:patient_id/visit', ctrl.makePatientVisit)
app.put('/api/patient/:patient_id/visit/:visit_id', ctrl.updatePatientVisit)
app.delete('/api/patient/:patient_id/visit/:visit_id', ctrl.deletePatientVisit)

//patient files endpoints (s3)
// app.post('/upload', ctrl.uploadPatientFiles)


app.use(express.static(__dirname + '/../build'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then((dbInstance) => {
    app.set('db', dbInstance)
    console.log('db connected')
    app.listen(SERVER_PORT, () => {
        console.log(`Listening on port ${SERVER_PORT}`)
    })
})