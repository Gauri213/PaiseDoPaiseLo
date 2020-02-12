const expenseCollection = require('../db').db().collection("ExpenseDetails");
const validator = require("validator");

let Expense = function(data) {
    this.data = data;
    this.errors = [];
  };

  Expense.prototype.cleanUp = function() {
    if (typeof(this.data.amount) != "string") {this.data.amount = "";}
    if (typeof(this.data.details) != "string") {this.data.details = "";}


    this.data = {
        amount: this.data.amount,
        details: this.data.details.trim().toLowerCase(),
    };
  };

  Expense.prototype.validate = function() {
    if (this.data.amount == "") {this.errors.push("You must enter amount.");}
    if(this.data.amount != "" && !validator.isNumeric(this.data.amount)) {this.errors.push("Amount can only contain numbers.")}
    if (this.data.details == "") {this.errors.push("You must provide a details.");}
    if(this.data.details.length > 50) {this.errors.push("Details cannot exceed 50 Characters.");}
  };

  
  Expense.prototype.createExpense=function(){
   this.validate();
   this.cleanUp();

   //only if there is no validation error
   //then save data into database

   if(!this.errors.length){
    expenseCollection .insertOne(this.data);
   }
  };


  module.exports=Expense;