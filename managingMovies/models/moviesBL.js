const movieJsonDAL=require('../dals/moviesJsonDAL')

const moviesRestDAL=require('../dals/moviesRestDAL')

exports.createMovie=async (obj)=>
{
    try{
        let allMoviesFromJson= await movieJsonDAL.readMovies();   
        if(allMoviesFromJson.movies.length>0)
        {
          let lastIdInJson=checkLastId(allMoviesFromJson.movies)
          writeToFile(allMoviesFromJson,lastIdInJson,obj);
        }
        else{
            let allMoviesFromRest=await moviesRestDAL.readMovies();
            let lastIdInRest=checkLastId(allMoviesFromRest.data)
            writeToFile(allMoviesFromJson,lastIdInRest,obj);
        }
       
        }
    catch (error)
         {
          console.error(error);
         }

}

exports.searchMovies=async(obj)=>
{
  let allMovies=await mergeTwoDataSources();
  let result= allMovies.filter(x=>{
    return ( isSameNames(x.name,obj.name) || obj.name==="") &&
     (x.language===obj.language || obj.language==="")&&
     (isSameGenres(x.genres,obj.genres) || obj.genres==="");
  })
  //console.log(result);
  return result;
}
exports.searchMovieById=async(id)=>
{
  let allMovies=await mergeTwoDataSources();
  let movie=allMovies.find(x=>x.id===id); 
  return movie;
}
exports.moviesNamesWithSameGenre=async(genre)=>
{
  let allMovies=await mergeTwoDataSources();
  let result= allMovies.filter(x=>{
    return (isSameGenres(x.genres,genre) || genre==="");
  })
  return result;
}

exports.getGenersList=async ()=>{
  let allMovies=await mergeTwoDataSources();
  let result= allMovies.map(x=>x.genres)
  var mySet = new Set();
  result.forEach(element => {
      element.forEach(x => {
         mySet.add(x);
    });
  });
 return mySet;
}

function writeToFile(allMovies,lastId,obj){

  let object={
            id:lastId+1,
            name: obj.name,
            language: obj.language,
            genres:obj.genres
          };
          allMovies.movies.push(object);
          movieJsonDAL.createMovie(allMovies)
}

function checkLastId(allMovies)
{
  let ids=allMovies.map(x=>x.id);
  let lastId=ids[ids.length-1];
  return lastId;
}
function isSameNames (x,y){
  
    return x.toLowerCase().includes(y.toLowerCase());  
}
  
function isSameGenres (x,y){
  if(typeof x === 'string')
    return x===y;
  else 
    return x.includes(y);  
}
async function mergeTwoDataSources(){
  let allMoviesFromJson= await movieJsonDAL.readMovies(); 
  let allMoviesFromRest= await moviesRestDAL.readMovies();
  let allMovies=allMoviesFromRest.data.concat(allMoviesFromJson.movies);
  return allMovies;
}

//this.searchMovies({name:"dome",language:"",genres:""});
