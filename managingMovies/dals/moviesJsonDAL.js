const jsonfile=require('jsonfile');


exports.createMovie=(obj)=>{
    return new Promise (async reject=>{
     jsonfile.writeFile(__dirname+"/newMovies.json",obj,(err) =>
     {
         if (err) reject(err);
      })
 
    })
     
 }

 exports.readMovies=() =>
{
    return new Promise((resolve,reject)=>
    {
        jsonfile.readFile(__dirname+"/newMovies.json",(err,obj)=>
        {
            if(err) reject(err);
            else resolve(obj);
    })

})


}