const {writings, writing_aggregation} = require('../models')
const Response = require('../util/response')
const {Op} = require('sequelize')
const db = require('../models/index')

const get = async (req, res, next) => {
    // 글감 목록
    try {
        const writing_instances = await writings.findAll(
            {
                where: {
                    deleted_at: {
                        [Op.is]: null
                    }
                },
                include: [{
                    model:writing_aggregation,
                    as:'writing_aggregations'
                }]
            }
        )

        Response(res, {
            data: writing_instances,
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
    const t = await db.sequelize.transaction();
    try {
        const data = req.body
        data.members_id = req.member
        // 글 작성
        const writing_instance = await writings.create(
            data,
            {transaction: t}
        )
        // 글감 통계 테이블 등록
        await writing_aggregation.create(
            {
                writings_id: writing_instance.id
            }, {transaction: t}
        )

        await t.commit()
        Response(res, {
            data: 'success',
            code: '0000'
        })
    } catch (e) {
        console.log(e)
        await t.rollback();
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
        const writing_instance = await writings.findByPk(id)
        if (writing_instance === null) {
            throw "Not Found"
        }
        res.json(
            {
                data: writing_instance,
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
