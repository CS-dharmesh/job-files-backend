import bcrypt from "bcrypt-nodejs";

import jsonwebtoken from "jsonwebtoken";

export default class AuthUtil {

    static encryptPassword(password, salt = bcrypt.genSaltSync(10)) {
        return bcrypt.hashSync(password, salt);
    }

    static comparePassword(password, hash) {
        return bcrypt.compareSync(password, hash);
    }

    static signJWT(payload) {
        console.log("payload :-----", payload);
        const opts = {
            expiresIn: "7d"
            // expiresIn: "30000"
        }

        return jsonwebtoken.sign(payload, config.JWTSecret, opts);
    }


    
}
