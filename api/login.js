const { smtpTransport } = require('../config/email');

const generateNum = () => {
    const min = 111111
    const max = 999999
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// 메일 인증번호 전송
const mailAuth = async (req, res) => {
    // 랜덤 숫자 생성
    const auth_num = generateNum()
    // json으로 메일 주소 받음
    const {email} = req.body
    // 메일 보냄
    const mail_template = {
        from:'상진그룹',
        to: email,
        subject: '[인증번호]메일 인증번호 입니다.',
        text:'인증번호 입니다. ' + auth_num
    }

    const result = await smtpTransport.sendMail(mail_template,(error,responses) => {
        if (error) {
            console.log(error)
        } else {
            console.log(responses)
        }
        smtpTransport.close();
    })

    res.json(result)
}

// 메일 인증번호 확인
const verifyCode = async (req, res) => {

}


module.exports={
    mailAuth
}
