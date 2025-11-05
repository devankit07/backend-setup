import {asynchandler} from "../utils/asynchandler";

const registeruser = asynchandler(async(request, response)=>{
   return response.status(200).json({
        message:"ok"
    });
});

export{registeruser}


