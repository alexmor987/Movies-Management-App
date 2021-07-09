const usersJsonDAL=require ('../dals/usersJsonDAL');


exports.readUsers=async ()=>
{
   try{
       let allusers= await usersJsonDAL.readUsers();
       return allusers;
       }
   catch (error)
        {
         console.error(error);
        }
}
exports.getUserLoginData=async(username,pwd)=>
{
   try{
       let allusers= await usersJsonDAL.readUsers();
       let userdata= allusers.users.find(x=>x.Username==username && x.Password===pwd);
       if (userdata){
        return userdata; 
       }
       
    }catch (error)
        {
         console.error(error);
        }
}


    
