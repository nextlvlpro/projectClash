function errorHandler(err, req, res, next) {
    console.log("Server Encountred an Error",err);
    res.status(500).json({ message: "Internal Server Error" });
}

module.exports = errorHandler;

