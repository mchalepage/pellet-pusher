module.exports = {
    getUserPatients: async (req, res) => {
        const { id } = req.params
        req.app.get('db').get_user_patients(id)
        .then(patients => res.status(200).send(patients))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    getUsername: async (req, res) => {
        const { username } = req.params
        req.app.get('db').get_user(username)
        .then(username => res.status(200).send(username))
        .catch(err => res.status(500).send({errorMessage: 'Error fetching username'}, console.log(err)))
    }
}