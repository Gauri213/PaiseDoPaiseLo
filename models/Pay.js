const payCollection = require('../db').db().collection("PayDetails");
const validator = require("validator");

let Pay = function(data) {
    this.data = data;
    this.errors = [];
  };

  Pay.prototype.cleanUp = function() {
    if (typeof(this.data.payamount) != "string") {this.data.payamount = "";}



    this.data = {
      payamount: this.data.payamount,
        
    };
  };

  Pay.prototype.validate = function() {
    if (this.data.payamount == "") {this.errors.push("You must enter amount.");}
    if(this.data.payamount != "" && !validator.isNumeric(this.data.payamount)) {this.errors.push("Amount can only contain numbers.")}
    
  };

  
  Pay.prototype.doPay=function(){
   this.validate();
   this.cleanUp();

   //only if there is no validation error
   //then save data into database

   if(!this.errors.length){
    payCollection.insertOne(this.data);
   }
  };


  module.exports=Pay;