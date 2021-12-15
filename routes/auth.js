const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

const {crearUsuario, revalidarToken} = require('../controllers/auth')
const { fieldsValidator } = require('../middlewares/fieldsValidator')
const { validateJWT } = require('../middlewares/validate-jwt')


router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        fieldsValidator
    ], 
    crearUsuario
)


router.get('/renew', validateJWT, revalidarToken );

module.exports = router