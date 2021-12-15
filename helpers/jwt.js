const jwt = require('jsonwebtoken');

const createJWT = ( uid, name ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid, name };

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token ) => {

            if ( err ){
                console.log(err);
                reject('Token could not be generate');
            }

            resolve( token );

        })


    })
}

module.exports = {
    createJWT
}