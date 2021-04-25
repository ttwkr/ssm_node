const {smtpTransport} = require('../config/email');
const {verify_code, members} = require('../models')
const bcrypt = require('bcrypt')

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
        res.json(
            {
                data: "code expired",
                code: "0002"
            }
        )
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
            res.json(
                {
                    data: "already exists email",
                    code: "0002"
                }
            )
        } else {
            // 가입 시작
            const password = data.password
            console.time("암호화 시작")
            const hashed_password = bcrypt.hash(password, 12, (err, hash) => {

            })
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
                data:e,
                code:"0002"
            }
        )
    }
}


module.exports = {
    mailAuth,
    verifyCode,
    join
}
