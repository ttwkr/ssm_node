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

    try{
        const data = req.body
        data.members_id = req.member
        // 글 작성
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
