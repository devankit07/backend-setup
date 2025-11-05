//async await promise wrapper for express route handlers
const asynchandler = (requesthandler)=>{
  return  (req,res,next)=>{
        Promise.resolve(requesthandler(req,res,next)).
        catch(err => next(err));
}
}


export default asynchandler;


//async await try catch wrapper for express route handlers


// const asynchandler = (fn) => async(req,res,next) => {
//     try {
//         await fn(req,res,next);
//     } catch (error) {
//         res.status(500).json({
//             success:false,
//             message:error.message
//         });
//     }
// }
