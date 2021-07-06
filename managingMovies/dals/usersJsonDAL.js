const jsonfile=require('jsonfile');


exports.readUsers=() =>
{
    return new Promise((resolve,reject)=>
    {
        jsonfile.readFile(__dirname+"/users.json",(err,obj)=>
        {

            if(err) reject(err);
            else resolve(obj);

    })

})


}

exports.createUser=(obj)=>{
   return new Promise (async reject=>{
    jsonfile.writeFile(__dirname+"/users.json",obj,(err) =>
    {
        if (err) reject(err);
     })

   })
    
}

