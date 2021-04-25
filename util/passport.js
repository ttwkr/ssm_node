const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const MemberModel = require('../models').members

const auth = () => {
    passport.serializeUser((member, done) => { // Strategy 성공시 호출
        done(null, member) // 여기의 member가 deserializerUser의 첫 매개변수로 이동
    })

    passport.deserializeUser( (member, done) => {  // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
        done(null, member) //여기의 user가 req.user가 됨
    })

    passport.use(
        new localStrategy( // local 전략 세움
            {
                user
            }
        )
    )
}
