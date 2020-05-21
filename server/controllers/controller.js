const aws = require('aws-sdk')
const { S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env

module.exports = {
    getPatients: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session.user

        const patients = await db.get_patients([user_id])

        res.status(200).send(patients)
    },
    getPatient: async (req, res) => {
        const db = req.app.get('db')
        const {patient_id} = req.params
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
        const db = req.app.get('db')
        const { patient_id } = req.params
        const { first_name, last_name, date_of_birth, gender, phone, email } = req.body
        await db.update_patient(patient_id, first_name, last_name, date_of_birth, gender, phone, email)
        const updatedPatient = await db.get_patient(patient_id)
        res.status(200).send(updatedPatient)
    },
    deletePatient: async (req, res) => {
        const db = req.app.get('db')

        const { patient_id } = req.params

        const deletedPatient = await db.delete_patient(patient_id)
        res.status(200).send(deletedPatient)

    },
    getPatientVisits: async (req, res) => {
        const db = req.app.get('db')
        const { patient_id } = req.params
        const visits = await db.get_patient_visits(patient_id)

        res.status(200).send(visits)
    },
    getPatientVisit: async (req, res) => {
        const db = req.app.get('db')
        const { visit_id } = req.params
        const visit = await db.get_patient_visit(visit_id)

        res.status(200).send(visit)
    },
    makePatientVisit: async (req, res) => {
        const db = req.app.get('db')
        const { date, visit_type, HPI, AMS_symptom_score, MRS_symptom_score, current_stress_level, sleep, mood, energy, libido, exercise, diet, meds, supplements, vitals_bp_systolic, vitals_bp_diastolic, vitals_spo2, weight, height, bmi, pbf, vfl, testicular_hypofunction_e29_1, menopausal_and_female_climacteric_states, notes, side_of_pellets } = req.body

        const { patient_id } = req.params

        const newPatientVisit = await db.add_patient_visit(patient_id, date, visit_type, HPI, AMS_symptom_score, MRS_symptom_score, current_stress_level, sleep, mood, energy, libido, exercise, diet, meds, supplements, vitals_bp_systolic, vitals_bp_diastolic, vitals_spo2, weight, height, bmi, pbf, vfl, testicular_hypofunction_e29_1, menopausal_and_female_climacteric_states, notes, side_of_pellets)

        res.status(200).send(newPatientVisit)
    },
    updatePatientVisit: async (req, res) => {
        const db = req.app.get('db')
        const { visit_id } = req.params

        const {date, visit_type, HPI, AMS_symptom_score, MRS_symptom_score, current_stress_level, sleep, mood, energy, libido, exercise, diet, meds, supplements, vitals_bp_systolic, vitals_bp_diastolic, vitals_spo2, weight, height, bmi, pbf, vfl, testicular_hypofunction_e29_1, menopausal_and_female_climacteric_states, notes, side_of_pellets} = req.body
        
        await db.update_patient_visit(visit_id, date, visit_type, HPI, AMS_symptom_score, MRS_symptom_score, current_stress_level, sleep, mood, energy, libido, exercise, diet, meds, supplements, vitals_bp_systolic, vitals_bp_diastolic, vitals_spo2, weight, height, bmi, pbf, vfl, testicular_hypofunction_e29_1, menopausal_and_female_climacteric_states, notes, side_of_pellets)

        const updatedVisit = await db.get_patient_visit(visit_id)
        res.status(200).send(updatedVisit)

    },
    deletePatientVisit: async (req, res) => {
        const db = req.app.get('db')
        const {visit_id} = req.params
        const deletedVisit = await db.delete_visit(visit_id)
        res.status(200).send(deletedVisit)

    },
    storePatientImg: (req, res) => {
        aws.config = {
            region: 'us-west-2',
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY
        }
        const s3 = new aws.S3({signatureVersion: 'v4'})
        const fileName = req.query['file-name']
        const fileType = req.query['file-type']
        const s3Params = {
            Bucket: S3_BUCKET,
            Key: fileName,
            Expires: 60,
            ContentType: fileType,
            ACL: 'public-read'
        }
        s3.getSignedUrl('putObject', s3Params, (err, data) => {
            if (err) {
                console.log(err)
                return res.end()
            }
            const returnData = {
                signedRequest: data,
                url: `https://${S3_BUCKET}.s3-us-west-2.amazonaws.com/${fileName}`
            }
            return res.send(returnData)
        })
    }
}