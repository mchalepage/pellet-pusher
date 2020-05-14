const bcrypt = require('bcryptjs')

module.exports = {
    registerUser: async (req, res) => {
        let { username, password } = req.body;
        let db = req.app.get('db')
        let [userFound] = await db.get_user([username]);
        if (userFound) {
          return res.status(409).send('Username already exists')
        }
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        
        let [createdUser] = await db.register_user([username, hash])
        req.session.user = createdUser
        res.status(200).send(req.session.user)
    },
    loginUser: async (req, res) => {
      const db = req.app.get('db')
      const {username, password} = req.body
  
      const [existingUser] = await db.get_user([username])
  
      if(!existingUser){
        return res.status(404).send('Username incorrect')
      }
  
      const authenticated = bcrypt.compareSync(password, existingUser.hash)
  
      if(authenticated){
        delete existingUser.password
  
        req.session.user = existingUser
  
        res.status(200).send(req.session.user)
      } else {
        res.status(404).send('Password incorrect')
      }
    },
    logoutUser: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getUser: async (req, res) => {
        if (req.session.user) {
            res.status(200).send(req.session.user)
            } else {
            res.sendStatus(404)
            }
    }
}