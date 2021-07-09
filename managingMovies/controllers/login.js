var express = require('express');
var router = express.Router();
const loginBL = require('../models/loginBL');

/* GET login Page. */
router.get('/', function(req, res, next) {
  res.render('login',{msg:''});
});
/* Authenticated User from users.json */
router.post('/login',async function(req, res, next) {
  let userDataVerified= await loginBL.getUserLoginData(req.body.username,req.body.password);
  if (userDataVerified){
      req.session["isAuthenticated"]=true;
      req.session["isAdmin"]=userDataVerified.isAdmin;
      req.session["numOfTransactions"]=userDataVerified.NumOfTransactions;
      res.redirect("/movie");
    }   
  else 
  {
    res.render('login',{msg:'UserName  or password are wrong!'});
  }
});
module.exports = router;
