const {writings} = require('../models')
const Response = require('../util/response')
const {Op} = require('sequelize')

const get = async (req, res, next) => {
    // 글감 목록
    try {
        const writings = await writingModel.findAll(
            {
                where: {
                    deleted_at: {
                        [Op.is]: null
                    }
                }
            }
        )

        Response(res, {
            data: writings,
            code: '0000'
        })
    } catch (e) {
        console.log(e)
        Response(res, {
            data: e,
            code: '0002'
        })
    }
}

//글감 등록
const post = async (req, res) => {

    try {
        const data = req.body
        data.members_id = req.member
        // 글 작성
        await writingModel.create(data)
        Response(res, {
            data: 'success',
            code: '0000'
        })
    } catch (e) {
        console.log(e)
        Response(res, {
            data: e,
            code: '0002'
        })
    }
}

//글감 상세조회
const detail = async (req, res) => {
    try {
        const id = req.params.id
        const writing = await writings.findByPk(id)
        if (writing === null) {
            throw "Not Found"
        }
        res.json(
            {
                data: writing,
                code: "0000"
            }
        )
    } catch (e) {
        res.json(
            {
                data: e,
                code: "0002"
            }
        )
    }
}

const put = async (req, res) => {
    try {
        const id = req.params.id
        const member_id = req.member
        const writing_instance = await writings.findByPk(id)
        if (member_id !== writing_instance.members_id) {
            throw "Invalid Authorization"
        }
        const data = req.body
        await writing_instance.update(data)
    } catch (e) {
        res.json({
            data: e,
            code: "0002"
        })
    }
}

const delete_writing = async (req, res) => {
    try {
        const id = req.params.id
        const member_id = req.member
        const writing_instance = writings.findByPk(id)
        if (member_id !== writing_instance.members_id) {
            throw "Invalid Authorization"
        }
        await writing_instance.delete()

        res.json(
            {
                data: "success",
                code: "0000"
            }
        )

    } catch (e) {
        res.json(
            {
                data: e,
                code: "0002"
            }
        )
    }
}

module.exports = {
    get,
    post,
    detail,
    delete_writing,
    put
}
