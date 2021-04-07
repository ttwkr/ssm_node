let members = [
    {
        id:1,
        name:"서상진",
    },
    {
        id:2,
        name:"강희영",
    },
    {
        id:3,
        name:"박종일",
    }
]


const get = (req, res) => {
    // 제한
    let limit = req.query.limit || 10
    res.json(members.slice(0,limit))
}

module.exports = {
    get:get
}