const {smtpTransport} = require('../config/email');
const {verify_code, members, member_token} = require('../models')
const bcrypt = require('bcrypt')
const {makeToken} = require('../util/auth')
const {Op} = require('sequelize')

const generateNum = () => {
    const min = 111111
    const max = 999999
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// 메일 인증번호 전송
const mailAuth = async (req, res) => {
    const now = new Date()
    // 만료시간 + 5분
    const expired_at = new Date(now.setMinutes(now.getMinutes() + 5))
    // 랜덤 숫자 생성
    const code = generateNum()
    // json으로 메일 주소 받음
    const {email} = req.body
    // 메일 보냄
    const mail_template = {
        from: '상진그룹',
        to: email,
        subject: '[인증번호]메일 인증번호 입니다.',
        text: '인증번호 입니다. ' + code
    }

    const result = await smtpTransport.sendMail(mail_template, (error, responses) => {
        if (error) {
            console.log(error)
        } else {
            // 검증테이블에 등록
            verify_code.create({email, code, expired_at})
        }
        smtpTransport.close();
    })

    res.json(result)
}

// 메일 인증번호 확인
const verifyCode = async (req, res) => {
    try{
        // 이메일과 인증번호 확인
        // 테이블에서 검증코드 가져옴
        const data = req.body
        const verify_instance = await verify_code.findOne(
            {
                where: {
                    email: data.email,
                    code: data.code
                }
            }
        )
        // 만료시간 5분전 확인
        const now = new Date()
        const expired_at = verify_instance.expired_at
        const timeGap = (expired_at.getTime() - now.getTime()) / 1000 / 60

        if (timeGap < 0) {
            throw "code expired"
        } else {
            verify_instance.update(
                {
                    is_success: true
                }
            )
            res.send(
                {
                    data: "success",
                    code: "0000"
                }
            )
        }
    } catch (e) {
        res.json(
            {
                data: e,
                code: "0002"
            }
        )
    }
}


// 회원 가입
const join = async (req, res) => {
    const data = req.body
    try {
        // 이메일 존재 확인
        const member_instance = await members.findOne(
            {
                where: {
                    email: data.email
                }
            }
        )
        if (member_instance) {
            throw "already exists email"
            
        } else {
            // 가입 시작
            const password = data.password
            console.time("암호화 시작")
            const hashed_password = await bcrypt.hash(password, 12)
            console.timeEnd("암호화 끝")
            await members.create(
                {
                    name: data.name,
                    phone: data.phone,
                    nick_name: data.nick_name,
                    email: data.email,
                    password: hashed_password,
                }
            )
            res.json(
                {
                    data: "success",
                    code: "0000"
                }
            )
        }
    } catch (e) {
        console.log(e)
        res.json(
            {
                data: e,
                code: "0002"
            }
        )
    }
}

//로그인
const login = async (req, res) => {
    try {
        const now = new Date()
        // 만료시간 + 5분
        const expired_at = new Date(now.setHours(now.getHours() + 1))
        const {email, password} = req.body

        // 회원 존재 여부 확인
        const member_instance = await members.findOne(
            {
                where: {
                    email: email,
                    deleted_at: {
                        [Op.is]: null
                    }
                }
            }
        )

        if (!member_instance) {
            throw "there is no member"
        }

        const check_password = await bcrypt.compare(password, member_instance.password)

        if (!check_password){
            throw "wrong password"
        }

        // 회원 확인 성공시 토큰 발급
        const token = makeToken(member_instance)
        // 토큰 테이블에 저장
        member_token.create(
            {
                members_id:member_instance.id,
                token:token,
                scope:"api",
                expired_at:expired_at
            }
        )

        res.json(
            {
                data:"success",
                code:"0000"
            }
        )


    } catch (e) {
        console.error(e)
        res.json(
            {
                data: e,
                code: "0002"
            }
        )
    }
}


module.exports = {
    mailAuth,
    verifyCode,
    join,
    login
}
