const axios=require('axios');

//Get All movies from REST API
exports.readMovies=()=>{
     return axios.get('https://api.tvmaze.com/shows');
}

