const memberModel = require('../models').members

const get = async (req, res, next) => {
    try{
        const members = await memberModel.findAll();
        res.json(members)
    } catch (e){
        console.log(e)
        next(e)
    }
}

module.exports = {
    get:get
}
