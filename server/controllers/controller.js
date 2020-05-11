module.exports = {
    getUserPatients: async (req, res) => {
        const { id } = req.params
        req.app.get('db').get_user_patients(id)
        .then(patients => res.status(200).send(patients))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    getUsername: async (req, res) => {
        const { id } = req.params
        req.app.get('db').get_user(id)
        .then(username => res.statsu(200).send(username))
        .catch(err => res.status(500).send({errorMessage: 'Error fetching username'}, console.log(err)))
    }
}