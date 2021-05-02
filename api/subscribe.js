const {matchMember} = require("../util/auth");
const {subscribe, members} = require('../models').models()

// 자기의 구독목록
const get = async (req, res) => {
    try {
        const member_id = req.member
        const subscribes = subscribe.findAll(
            {
                where: {
                    members_id: member_id
                },
                include: [
                    {
                        model: members,
                        as: 'target_member'
                    }
                ]
            }
        )

        res.json(
            {
                data: subscribes,
                code: "0000"
            }
        )
    } catch (e) {
        console.error(e)
        res.json(
            {
                data: e,
                code: '0002'
            }
        )
    }
}

//구독취소
const delete_subscribe = async (req, res) => {
    try {
        const id = req.params.id
        const member_id = req.member
        const match_member = matchMember(id, member_id, subscribe)
        await subscribe.delete({
            where: {id}
        })
        res.json(
            {
                data: subscribes,
                code: "0000"
            }
        )
        if (!match_member) {
            throw "Invalid Authorization"
        }

    } catch (e) {
        console.error(e)
        res.json(
            {
                data: e,
                code: '0002'
            }
        )
    }
}

module.exports = {
    get,
    delete_subscribe
}
