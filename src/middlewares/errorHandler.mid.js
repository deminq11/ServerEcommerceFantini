export default function errorHandler(error, req, res, next) {
    const message = req.method + " " + req.url + " " + error.message || req.method + " " + req.url + "-API ERROR"
    const statusCode = error.statusCode || 500
    console.log(error)
    return res.status(statusCode).json({ error: statusCode, message })
}   