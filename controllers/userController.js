const User = require('../models/User');
let db;
let collection;
exports.login = function(req, res) {
  let user = new User(req.body);
  user.login().then(function(result) {
    req.session.user = {favColor: "blue", username: user.data.username}
    req.session.save(function() {
      res.redirect('/')
    })
  }).catch(function(e) {
    req.flash('errors', e)
    req.session.save(function() {
      res.redirect('/')
    })
  })
}

exports.logout = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/')
  })
}

exports.register = function(req, res) {
  let user = new User(req.body)
  //console.log(req.body.username);

  user.register().then(() => {
    req.session.user = {username: user.data.username}
    req.session.save(function() {
      res.redirect('/')
    })
  }).catch((regErrors) => {
    regErrors.forEach(function(error) {
      req.flash('regErrors', error)
    })
    req.session.save(function() {
      res.redirect('/')
    })
  })
}

exports.home = function(req, res) {
  if (req.session.user) {
    res.render('home-dashboard', {username: req.session.user.username})
  } else {
    res.render('home-guest', {errors: req.flash('errors'), regErrors: req.flash('regErrors')})
  }
};

exports.viewContact=async function(req,res){
//res.render('Expense');
try{
let user=await User.findSingleById(req.params.id);
res.render('Expense',{user:user});
} catch(e){
res.send("404 template go here");
}
};