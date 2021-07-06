const usersJsonDAL=require ('../dals/usersJsonDAL');

exports.createUser=async(obj)=>
{
   try{
      
       let allusers= await usersJsonDAL.readUsers();
       let lastIdInJson=checkLastId(allusers.users);
       writeToFile(allusers,lastIdInJson,obj);
       }
   catch (error)
        {
         return("error");
        }
}

exports.readUsers=async()=>
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
exports.readUserById=async(id)=>
{
   try{
       let allusers= await usersJsonDAL.readUsers(); 
       let user=allusers.users.find(x=>x.id===id);
        return user;
       }
   catch (error)
        {
         console.error(error);
        }
}

exports.updateUser=async(obj)=>
{
    try{
        let allusers=await this.readUsers();
        let ids =allusers.users.map(x=>x.id);
        let indexOfId=ids.indexOf(parseInt(obj.id)); 
       
        allusers.users[indexOfId]={
            id:parseInt(obj.id),
            Username:obj.Username,
            Password:obj.Password,
            CreatedDate:obj.CreatedDate,
            NumOfTransactions:parseInt(obj.NumOfTransactions),
            isAdmin:pareseBoolean(obj.isAdmin)
        }
        usersJsonDAL.createUser(allusers);
        }
    catch (error)
         {
          console.error(error);
         }


}
exports.deleteUser=async(id)=>{
    try{
        let allusers=await this.readUsers();
        let ids =allusers.users.map(x=>x.id);
        let indexOfId=ids.indexOf(id);  
        usersJsonDAL.createUser({"users":allusers.users.slice(0,indexOfId)});
        }
    catch (error)
         {
          console.error(error);
         }
}
function pareseBoolean(string){
  return (string == "true");
}

function writeToFile(allusers,lastId,obj)
{

    let object={
              id:lastId+1,
              Username: obj.Username,
              Password:obj.Password,
              CreatedDate:new Date().toISOString(),
              NumOfTransactions:10,
              isAdmin:false

            };
            allusers.users.push(object);
            usersJsonDAL.createUser(allusers) ;
  }
  
  function checkLastId(allUsers)
  {
    let ids=allUsers.map(x=>x.id);
    let lastId=ids[ids.length-1];
    return lastId;
  }
