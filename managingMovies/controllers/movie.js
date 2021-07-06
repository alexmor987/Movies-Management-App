var express = require('express');
var router = express.Router();
const moviesBL = require('../models/moviesBL');
//TO DO
router.get('/', function(req, res, next) {
  if(req.session.isAuthenticated)
  {
    if(req.session.isAdmin)
      res.render('menu',{isAdmin:req.session.isAdmin,msg:''});
    else if(req.session.numOfTransactions>0)
      res.render('menu',{isAdmin:req.session.isAdmin,msg:''});
    else
      res.render('login',{msg:"The user  hasn't “credits” for the current day!"});
  }     
  else
  {
      res.redirect("/login");
  }
 
});

/* GET create New Movie Page. */
router.get('/createNewMovie', function(req, res, next) {
  res.render('createNewMovie',{isAdmin:req.session.isAdmin,msg:''});
});

/* POST create New Movie. */
router.post('/createNewMovie',async function(req, res, next) {
  await moviesBL.createMovie(req.body);
  res.render('menu', {isAdmin:req.session.isAdmin, msg : "A movie has been created!"})

});
/* GET Search Movies Page. */
router.get('/searchMovies',async function(req, res, next) {
  let geners=await moviesBL.getGenersList();
  res.render('searchMovies',{generslist:geners});
});
/* POST Search Movies Page. */
router.post('/searchMovies',async function(req, res, next) {
  console.log(req.body);
  let resultOfSearchMovies=await moviesBL.searchMovies(req.body);
  let resultOfSameGenere=await moviesBL.moviesNamesWithSameGenre(req.body.genres);
  res.render('searchResults',{result:resultOfSearchMovies,moviesNamesWithSameGenre:resultOfSameGenere})
});

router.get('/searchMovie/:id',async function(req, res, next) {
  let id=req.params.id;
  let movieData = await moviesBL.searchMovieById(parseInt(id));
  res.render('movieData', {data:movieData})
});

module.exports = router;
