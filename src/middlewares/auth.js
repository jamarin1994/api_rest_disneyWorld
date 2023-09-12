const jwt = require("jsonwebtoken");

module.exports = (req,res,next) =>{
    const token = req.get("authorization");

    if(!token || !token.toLowerCase().startsWith("bearer")){
        const response = {
            status: 401,
            msg: "falta el encabezado de autorización"
        }
        return res.status(401).json(response)
    }
    console.log(token.substring(7));
    try {
        const decodedToken = jwt.verify(token.substring(7),process.env.JWT_SECRET)
        
        if(!decodedToken.id){
            const response = {
                status: 401,
                msg: "token invalido"
            }
            return res.status(401).json(response)
        }
        
        next()
    } catch (error) {
        const response = {
            status: 401,
            msg: "Token inválido o caducado"
        }
        console.log(error);
        return res.status(401).json(response)    
    }
}