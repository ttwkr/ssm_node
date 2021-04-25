const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const MemberModel = require('../models').members

const auth = () => {
    passport.serializeUser((member, done) => {
        done(null, user)
    })

    passport.deserializeUser()
}
