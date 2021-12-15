const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { createJWT } = require('../helpers/jwt');

const createUser = async(req, res = express.response) => {

    const { email, password} = req.body

    try {
        let user = await User.findOne({email})

        if(user) {
            return res.status(400).json({
                ok: false,
                msg: 'Authentication problem'
            })
        }

        user = new User( req.body )

        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)

        await user.save()

        // Generate JWT
        const token = await createJWT( user.id, user.name );

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
            msg: 'Internal server error'
        })
    }
}

const loginUser = async(req, res = response) => {

    const { email, password } = req.body 

    try {
        let user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                ok: false,
                msg: 'Internal server error'
            })
        }

        //Confirmar password

        const validPassword = bcrypt.compareSync( password, user.password)

        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Check your credentials'
            })
        }

        //Generer JWT
        const token = await createJWT( user.id, user.name)

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Internal server problem'
        }) 
    }
}

const renewToken = async (req, res) => {

    const { uid, name } = req;

    // Generar JWT
    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        token
    })
}

module.exports = {
    createUser,
    loginUser,
    renewToken
}