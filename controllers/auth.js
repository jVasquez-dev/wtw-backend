const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = express.response) => {

    const { email, password} = req.body

    try {
        let user = await User.findOne({email})

        if(user) {
            return res.status(400).json({
                ok: false,
                msg: 'There is an user with this email'
            })
        }


        user = new User( req.body )

        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)

        await user.save()

        // Generar JWT
        const token = await generarJWT( user.id, user.name );

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor contacte al admin'
        })
    }
}

const revalidarToken = async (req, res) => {

    const { uid, name } = req;

    // Generar JWT
    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        token
    })
}

module.exports = {
    crearUsuario,
    revalidarToken
}