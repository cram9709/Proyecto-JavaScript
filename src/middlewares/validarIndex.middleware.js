const idValido = (req,res,next)=>{
    const  {_id}  = req.params;
    const ejemplo = 24
    const tamaño = _id.length;  
    if(ejemplo === tamaño){
          next();
    }else{
        res.status(400).json("El id esta mal escrito o no tiene la cantidad de caracteres requeridos");
    }
}

module.exports = { idValido }  ;
