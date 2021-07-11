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
router.get('/createNewMovie',async function(req, res, next) {
  if(req.session.isAuthenticated) {
    if(req.session.isAdmin){
      let geners=await moviesBL.getGenersList();
      res.render('createNewMovie',{isAdmin:req.session.isAdmin,generslist:geners,msg:''});
    }
    else if(req.session.numOfTransactions===0){
      res.render('login',{msg:'Your "credits" have expired for the current day!'}); 
      }
    else{
        let geners=await moviesBL.getGenersList();
         res.render('createNewMovie',{isAdmin:req.session.isAdmin,generslist:geners,msg:''});
      }
  }
  else
  {
    res.redirect('/login');
  }
});

/* POST create New Movie. */
router.post('/createNewMovie',async function(req, res, next) {
  if(req.session.isAuthenticated) {
    if(req.session.isAdmin){
      await moviesBL.createMovie(req.body);
      res.render('menu', {isAdmin:req.session.isAdmin, msg : "A movie has been created!"});
    }
      else if(req.session.numOfTransactions===0){
      res.render('login',{msg:'Your "credits" have expired for the current day!'}); 
      }
      else{
        req.session.numOfTransactions--;
        await moviesBL.createMovie(req.body);
        res.render('menu', {isAdmin:req.session.isAdmin, msg : "A movie has been created!"});
    }
  }
  else
  {
    res.redirect('/login');
  }
});
/* GET Search Movies Page. */
router.get('/searchMovies',async function(req, res, next) {
    if(req.session.isAuthenticated) {
    let geners=await moviesBL.getGenersList();
    let languages=await moviesBL.getLanguagesList();
    res.render('searchMovies',{generslist:geners,languagesList:languages});
    }
    else{
      res.redirect('/login');
    }
});
/* POST Search Movies Page. */
router.post('/searchMovies',async function(req, res, next) {
  if(req.session.isAuthenticated) {
     if(req.session.isAdmin){
      let resultOfSearchMovies=await moviesBL.searchMovies(req.body);
      let resultOfSameGenere=await moviesBL.moviesNamesWithSameGenre(req.body.genres);
      res.render('searchResults',{result:resultOfSearchMovies,moviesNamesWithSameGenre:resultOfSameGenere});
      }
     else  if(req.session.numOfTransactions===0){
      res.render('login',{msg:'Your "credits" have expired for the current day!'}); 
      }
      else{
        req.session.numOfTransactions--;
        let resultOfSearchMovies=await moviesBL.searchMovies(req.body);
        let resultOfSameGenere=await moviesBL.moviesNamesWithSameGenre(req.body.genres);
        res.render('searchResults',{result:resultOfSearchMovies,moviesNamesWithSameGenre:resultOfSameGenere});
      }
    }
  else
    {
    res.redirect('/login');
    }
  
});

router.get('/searchMovie/:id',async function(req, res, next) {
  if(req.session.isAuthenticated) {
    if(req.session.isAdmin){
      let id=req.params.id;
      let movieData = await moviesBL.searchMovieById(parseInt(id));
      res.render('movieData', {data:movieData});
    }
    else if(req.session.numOfTransactions===0){
      res.render('login',{msg:'Your "credits" have expired for the current day!'}); 
      }
    else{
        req.session.numOfTransactions--;
        let id=req.params.id;
        let movieData = await moviesBL.searchMovieById(parseInt(id));
        res.render('movieData', {data:movieData});
      }
  }
  else
  {
    res.redirect('/login');
  }
});

module.exports = router;
