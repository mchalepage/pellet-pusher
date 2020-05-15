

module.exports = {
    getPatients: async (req, res) => {
        req.app.get('db').get_patients()
        .then(patients => res.status(200).send(patients))
        .catch(err => res.status(500).send({errorMessage: 'Error fetching patients'}, console.log(err)))
    },
    getPatient: async (req, res) => {
        req.app.get('db').get_patient()
        .then(patient => res.status(200).send(patient))
        .catch(err => res.status(500).send({errorMessage: 'Error fetching patient'}, console.log(err)))
    },
    // getUsername: async (req, res) => {
    //     const { username } = req.params
    //     req.app.get('db').get_user(username)
    //     .then(username => res.status(200).send(username))
    //     .catch(err => res.status(500).send({errorMessage: 'Error fetching username'}, console.log(err)))
    // },
    getPatientVisits: async (req, res) => {
        const db = req.app.get('db')
        const { patient_id } = req.params
        const visits = await db.get_patient_visits()

        res.status(200).send(visits)
    },
    savePatientVisit: async (req, res) => {
        
    }
}