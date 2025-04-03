const mainRouter = require('express').Router();


mainRouter.post("/base", (req,res) => {
    res.json({
        message: "hello"
    })
})



module.exports = mainRouter