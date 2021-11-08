const router = require('express').Router()
const bcrypt = require('bcryptjs')
const { add, findBy } = require('../users/users-model')

const validatePayload = (req, res, next) => { next() }

router.post('/register', validatePayload, async (req, res, next) => {
    try {
        const { username, password } = req.body
        const hash = bcrypt.hashSync(password, 8) // 2^8//doesn't need to be super fast
        const user = { username, password: hash }
        const createdUser = await add(user)
        console.log(createdUser)
        res.status(201).json(createdUser)
    } catch(err){
        next(err)
    }
})

router.post('/login', validatePayload, async (req, res, next) => {
    try{
        const { username, password } = req.body
        //does username correspond to an existing user?
        const [user] = await findBy({ username })

        //if existing has length, awesome
        // otherwise send user packing

        if(user && bcrypt.compareSync(password, user.password)){ //password passed in compared to password from the database
            console.log(user)
            //we have determined the username and password are legit
            //we have to start a session with this user
        } else {
            next({ status: 401, message: 'bad credentials'})
        }
    }catch(err){
        next(err)
    } 
})
router.get('/logout', async (req, res, next) => {
    res.json('logout wired!')
})


module.exports = router
