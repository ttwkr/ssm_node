require('dotenv').config()
const jwt  = require('jsonwebtoken')
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const makeToken = (member) => {
    //토큰 생성
    const secret_key = process.env.SECRET_KEY
    const option = {
        algorithm:"HS256",
        expiresIn:'1h',

    }
    const payload = {
        id:member.id
    }

    return jwt.sign(payload, secret_key, option)
}

const verifyToken = (token) => {
    let decoded
    try {
        const secret_key = process.env.SECRET_KEY
        decoded = jwt.verify(token, secret_key)
    } catch (e) {
        if (e.message === 'jwt expired') {
            console.log('expired token');
            return TOKEN_EXPIRED;
        } else if (e.message === 'invalid token') {
            console.log('invalid token');
            console.log(TOKEN_INVALID);
            return TOKEN_INVALID;
        } else {
            console.log("invalid token");
            return TOKEN_INVALID;
        }
    }
    return decoded
}

const checkToken = async (req, res, next) => {
    // 토큰 검증
    try {
        const token = req.headers.token
        if (!token){
            throw "there is no token"
        }
        const member = await verifyToken(token)

        if (member === TOKEN_EXPIRED){
            throw "Token is expired"
        }

        if(member === TOKEN_INVALID) {
            throw "Token is invalid"
        }

        if (member.id === undefined){
            throw "member is invalid"
        }

        req.member = member.id
        next()
    } catch (e) {
        console.error(e)
        res.json({
            data:e,
            code:"0002"
        })
    }
}

// 각 컨텐츠의 수정/삭제 가능한 사람이 맞는지 확인
const matchMember = (id, member_id, instance) => {
    try{
        const model_instance = instance.findByPk(id)
        if (member_id !== model_instance.members_id) {
            throw "Invalid Authorization"
        }
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}

module.exports = {
    makeToken,
    checkToken,
    matchMember
}
