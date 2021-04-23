const { smtpTransport } = require('../config/email');
const verifyModel = require('../models').verify_code

const generateNum = () => {
    const min = 111111
    const max = 999999
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// 메일 인증번호 전송
const mailAuth = async (req, res) => {
    const now = new Date()
    // 만료시간 + 5분
    const expired_at = new Date(now.setMinutes(now.getMinutes()+5))
    // 랜덤 숫자 생성
    const code = generateNum()
    // json으로 메일 주소 받음
    const {email} = req.body
    // 메일 보냄
    const mail_template = {
        from:'상진그룹',
        to: email,
        subject: '[인증번호]메일 인증번호 입니다.',
        text:'인증번호 입니다. ' + code
    }

    const result = await smtpTransport.sendMail(mail_template,(error,responses) => {
        if (error) {
            console.log(error)
        } else {
            // 검증테이블에 등록
            verifyModel.create({email, code, expired_at})
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
    const verify_instance = await verifyModel.findOne(
        {
            where:{
                email:data.email,
                code:data.code
            }
        }
    )
    // 만료시간 5분전 확인
    const now = new Date()
    const expired_at = verify_instance.expired_at
    const timeGap = (expired_at.getTime()-now.getTime())/1000 / 60

    if (timeGap < 0){
        res.json(
            {
                data:"error",
                code:"0002"
            }
        )
    } else {
        verify_instance.update(
            {
                is_success:true
            }
        )
        res.send(
            {
                data:"success",
                code:"0000"
            }
        )
    }
}


module.exports={
    mailAuth,
    verifyCode
}
