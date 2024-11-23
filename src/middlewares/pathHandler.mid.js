export default function pathHandler (req, res, next){
    const message = req.method + " " + req.url + "- NOT FOUND"
    return res.status(404).json({message})
}