const Expense = require('../models/Expense');


exports.createExpense=function(req, res) {
let expense=new Expense(req.body);
expense.createExpense();
if(expense.errors.length){
res.redirect('/');
}else{

res.render('expense');

}
};
