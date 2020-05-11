const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        const { session } = req

        let existingUser = await db.get_user(username)
        if(existingUser[0]){
            return res.status(400).send('Username already in use')
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        let newUser = await db.register_user(username, hash)
        newUser = newUser[0]
        delete newUser.password
        session.user = newUser
        res.status(200).send(session.user)
    },
    login: async (req, res) => {
        const db = req.app.get('db')
        const { username, password } = req.body
        const { session } = req
        let existingUser = await db.get_user(username)
        
        if(!existingUser[0]){
            return res.status(404).send('User not found')
        }
        const foundUser = bcrypt.compareSync(password, existingUser[0].password)
        if(foundUser){
            delete existingUser[0].password
            session.user = existingUser[0]
            res.send(session.user)
        } else {
            res.status(403).send('Incorrect password')
        }
    },
    logout: async (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getUser: async (req, res) => {
        const { user } = req.session
        if(user){
            res.status(200).send(user)
        } else {
            res.status(404).send('Could not find session user')
        }
    }
}