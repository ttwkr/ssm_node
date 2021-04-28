const {matchMember} = require("../util/auth");
const {comments} = require('../models')

// 댓글 작성
const post = async (req, res) => {
    try {
        //글감 아이디
        const id = req.params.id
        const member_id = req.member
        const data = req.body
        data.members_id = member_id
        data.writings_id = id
        await comments.create(data)

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
                code: "0000"
            }
        )
    }
}

//댓글 삭제
const comment_delete = async (req, res) => {
    try {
        // 댓글 아이디
        // 일정 기간 지난후에는 삭제 못함
        // 일주일로 하자
        const id = req.params.id
        const member_id = req.member
        const result = matchMember(id, member_id)
        if (!result) {
            throw "Invalid Authorization"
        }
        const now = new Date()
        const comment_instance = comments.findByPk(id)
        const comment_create_at = comment_instance.created_at

        // 경과시간 계산
        const elapsedDay = (now - comment_create_at) / 1000 / 60 / 60 / 24

        if (elapsedDay > 7) {
            throw "댓글 작성기준 7일 후에는 삭제할 수 없습니다."
        }
        await comment_instance.delete()

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
    post,
    comment_delete
}