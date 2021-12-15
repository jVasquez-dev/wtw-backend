const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

const {createUser, loginUser , renewToken} = require('../controllers/auth')
const { fieldsValidator } = require('../middlewares/fields-validator')
const { validateJWT } = require('../middlewares/validate-jwt')


router.post(
    '/new',
    [//middlewares
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must have at least 6 characters').isLength({min: 6}),
        fieldsValidator
    ], 
    createUser
)

router.post(
    '/',
    [
        check('password', 'Password must have more than 6 characters').isLength({min: 6}),
        check('email', 'Email is required').isEmail(),
        fieldsValidator
    ],
    loginUser

)


router.get('/renew', validateJWT, renewToken );

module.exports = router