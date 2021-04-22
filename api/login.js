const { smtpTransport } = require('../config/email');

const generateNum = () => {
    const min = 111111
    const max = 999999
    return Math.floor(Math.random() * (max - min + 1)) + min
}

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
            return error
        } else {
            /* 클라이언트에게 인증 번호를 보내서 사용자가 맞게 입력하는지 확인! */
            console.log(responses)
            return res.send(auth_num)
        }
        smtpTransport.close();
    })
}


module.exports={
    mailAuth
}
