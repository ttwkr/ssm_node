const {subscribe, members} = require('../models').models()

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
                data:subscribes,
                code:"0000"
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

module.exports={
    get
}
