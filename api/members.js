const memberModel = require('../models').members
const Response = require('../util/response')
const {Op} = require("sequelize");

const get = async (req, res, next) => {
    try{
        const members = await memberModel.findAll(
            {
                where:{
                    deleted_at:{
                        [Op.is]: null
                    }
                }
            }
        );
        Response(res, {
            data: members,
            code: "0000"
        })
    } catch (e){
        console.log(e)
        next(e)
    }
}

const post = async (req, res, next) => {
    try{
        const now = new Date()
        const data = req.body
        await memberModel.create(
            {
                name: data.name,
                phone: data.phone,
                nick_name: data.nick_name,
                email: data.email,
                created_at: now,
            }
        )
        Response(res, "success")

    } catch (e) {
        console.log(e)
        Response(res, {
            data: e.errors[0].message,
            code: "0002"
        })
    }
}

const member_delete = async (res, req, next) => {
    try{
        const query_param = res.query
        const now = new Date()
        await memberModel.update(
            {
                deleted_at: now
            },
            {
                where : {
                    id:query_param.id
                }
            }
        )
        Response(res,{
            data:"success",
            code:"0000"
        })
    }catch (e){
        console.log(e)
    }
}

module.exports = {
    get:get,
    post:post,
    member_delete:member_delete
}
