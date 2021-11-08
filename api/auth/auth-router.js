const router = require('express').Router()

const validatePayload = (req, res, next) => { next() }

router.post('/register', validatePayload, async (req, res, next) => {
    try {

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
