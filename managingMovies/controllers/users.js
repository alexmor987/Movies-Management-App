var express = require('express');
var router = express.Router();
const usersBL = require('../models/usersBL');


//TO DO
router.get('/',async function(req, res, next) {
let data=await usersBL.readUsers();
    res.render('usersManagement',{usersData:data.users});
  
});
router.post('/updateUser',async function(req, res, next) {
    await usersBL.updateUser(req.body);
    res.redirect('/users');
    });

    /***update */
router.get('/updateUser/:id',async function(req, res, next) {
        let data=await usersBL.readUserById(parseInt(req.params.id));
            res.render('userData',{userData:data});
        });
router.get('/deleteUser/:id',async function(req, res, next) {
        await usersBL.deleteUser(parseInt(req.params.id));
        res.redirect('/users');
    });
router.post('/createUser',async function(req, res, next) {
        await usersBL.createUser(req.body);
        res.redirect('/users');
    });
router.get('/createUser',async function(req, res, next) {
     res.render('userData',{userData:""}); 
    });

module.exports = router;