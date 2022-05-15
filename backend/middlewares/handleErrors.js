
const handdleError = (res, code = 500, msg = "INTERNAL_SERVER_ERR", err = "NOT_MSG")=>{
    res.status(code).json({ 
        msg,
        err
    })
}

module.exports = handdleError;