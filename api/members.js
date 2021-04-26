const {members} = require('../models')
const Response = require('../util/response')
const {Op} = require("sequelize");

const get = async (req, res) => {
    try {
        const id = req.member
        const member_instance = await members.findOne(
            {
                where:{id},
                attributes:['id','name','phone','email']
            }
        )
        res.json({
            data:member_instance,
            code:"0000"
        })
    } catch (e) {
        console.log(e)
        res.json({
            data:e,
            code:"0000"
        })
    }
}

const update = async (req, res) => {
    try {
        const data = req.body
        const member_id = req.member
        await members.update(
            data,
            {
                where: {
                    id: member_id
                }
            }
        )
        Response(res, {
            data: "success",
            code: "0000"
        })
    } catch (e) {
        console.log(e)
        Response(res, {
            data: e.errors[0].message,
            code: "0002"
        })
    }
}

const member_delete = async (req, res) => {
    try {
        const member_id = req.member
        const now = new Date()
        await members.update(
            {
                deleted_at: now
            },
            {
                where: {
                    id: member_id
                }
            }
        )
        Response(res, {
            data: "success",
            code: "0000"
        })
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    get,
    member_delete,
    update
}
