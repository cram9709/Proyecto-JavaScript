const isAdmin= (req,res,next)=>{
       const { isAdmin }= req.auth;
       if(isAdmin){
          next();
       }else{
           res.status(401).json('No esta autorizado');
       };
 
};

module.exports = { isAdmin };