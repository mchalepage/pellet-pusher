

module.exports = {
    getPatients: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session.user

        const patients = await db.get_patients([user_id])

        res.status(200).send(patients)
    },
    getPatient: async (req, res) => {
        const db = req.app.get('db')
        const {patient_id} = req.body
        const patient = await db.get_patient([patient_id])

        res.status(200).send(patient)
    },
    addPatient: async (req, res) => {
        const db = req.app.get('db')
        const {first_name, last_name, date_of_birth, gender, phone, email} = req.body

        const {user_id} = req.session.user

        const patient = await db.add_patient(user_id, first_name, last_name, date_of_birth, gender, phone, email)
        res.status(200).send(patient)
    },
    updatePatient: async (req, res) => {
    
    },
    deletePatient: async (req, res) => {

    },
    getPatientVisits: async (req, res) => {
        const db = req.app.get('db')
        const { patient_id } = req.params
        const visits = await db.get_patient_visits()

        res.status(200).send(visits)
    },
    getPatientVisit: async (req, res) => {

    },
    makePatientVisit: async (req, res) => {
        
    },
    updatePatientVisit: async (req, res) => {

    },
    deletePatientVisit: async (req, res) => {

    }
}