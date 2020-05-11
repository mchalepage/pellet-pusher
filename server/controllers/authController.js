const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        let { username, password } = req.body;
        let db = req.app.get('db')
        let userFound = await db.get_user([username]);
        if (userFound[0]) {
          return res.status(200).send('Username already exists')
        }
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        let createdUser = await db.register_user([username, hash])
        req.session.user = { id: createdUser[0].id, username: createdUser[0].username }
        res.status(200).send(req.session.user)
    },
    login: async (req, res) => {
        let { username, password } = req.body;
        let db = req.app.get('db')
        let userFound = await db.get_user([username])
        if (!userFound[0]) {
          return res.status(200).send('Incorrect username. Please try again.');
        }
        let result = bcrypt.compareSync(password, userFound[0].hash)
        if (result) {
          req.session.user = { id: userFound[0].id, username: userFound[0].username }
          res.status(200).send(req.session.user)
        } else {
          return res.status(401).send('Incorrect username/password')
        }
    },
    logout: async (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getUser: (req, res) => {
        if (req.session.user) {
            res.status(200).send(req.session.user)
            } else {
            res.status(401).send('please log in')
            }
    }
}