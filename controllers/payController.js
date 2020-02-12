const Pay = require('../models/Pay');

exports.doPay=function(req,res){
    let pay=new Pay(req.body);
    pay.doPay();
    if(pay.errors.length){
    res.redirect('/');
    }else{
      res.send("paid");
}
};