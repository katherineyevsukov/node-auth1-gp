const router = require('express').Router()
const bcrypt = require('bcryptjs')
const { add } = require('../users/users-model')

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
    res.json('login wired!')
})
router.get('/logout', async (req, res, next) => {
    res.json('logout wired!')
})


module.exports = router
