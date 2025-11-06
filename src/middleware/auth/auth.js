export const authAdmin = (req, res, next)=>{
    if(req.user.role!="admin"){
        res.setHeader('Content-Type','application/json');
        return res.status(403).json({ error:"Solo un administrador realizar esta accion" })
    }

    next()
}

export const authUser = (req, res, next)=>{
    if(req.user.role!="user"){
        res.setHeader('Content-Type','application/json');
        return res.status(403).json({ error:"Solo un usuario registrado puede realizar esta accion" })
    }

    next()
}