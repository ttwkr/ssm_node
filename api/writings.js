const writingModel = require('../models').writings
const Response = require('../util/response')
const {Op} = require('sequelize')

const get = async (req, res, next) => {
    // 글감 목록
    try{
        const writings = await writingModel.findAll(
            {
                where: {
                    deleted_at:{
                        [Op.is]: null
                    }
                }
            }
        )

        Response(res,{
            data: writings,
            code: '0000'
        })
    } catch (e) {
        console.log(e)
        Response(res, {
            data: e,
            code:'0002'
        })
    }
}

const post = async (req, res) => {
    //TODO 인증절차 구현해서 member 넣어줘야한다
    try{
        const data = req.body
        await writingModel.create(data)
        Response(res, {
            data: 'success',
            code:'0000'
        })
    } catch (e) {
        console.log(e)
        Response(res, {
            data: e,
            code:'0002'
        })
    }
}

module.exports = {
    get,
    post
}
