const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {

    return new Promise ((resolve, reject) => {
        const payload = {
            uid
        };
    
        //create jwt
        jwt.sign( payload, 
            process.env.JWT_SECRET, 
            {
                expiresIn: '4h'
            }, 
            (err, token) => {
                if ( err ) {
                    console.log(err);
                }
                resolve(token);
            });
    });
}

module.exports = {
    generateJWT
}