const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');
const expenseController = require('./controllers/expenseController');
const payController = require('./controllers/payController');


router.get('/', userController.home);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/createExpense/:id',userController.viewContact);


//Expense related post
router.post('/createExpense', expenseController.createExpense);
router.post('/doPay',payController.doPay);




module.exports = router;