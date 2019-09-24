const User = require('../models/user');

module.exports = {
  //create new
  addUser: (req, res) => {
    const newUser = new User(req.body);
    newUser.save((error, result) => {
      if (error) {
        res.status(400).send({
          message: `error, user failed to created`,
          error
        })
      } else {
        res.status(200).send({
          message: `new user created`,
          result
        });
      }
    })
  },
    showAll: (req, res) =>{
      User.find(function (err, result){
        if(err){
          res.send({
            status: 'error',
            message: err,
          });
        }
        res.send({
          status: 'success',
          message:"retrieved successfully",
          data: result
        })
      })
    },
  //read
  showDataById: (req, res) => {
    User.findById({_id: req.params.userId}, function(err, result){
      if(err) {
        res.status(400).send({
          message: `no data show`,
          err
        })
      } else {
        res.status(200).send({
          message: `showing data`,
          result
        })
      }
    })
  },
  deleteUser: (req, res) => {
    User.deleteOne({_id: req.params.userId}, function(err, result){
      if(err) {
        res.status(400).send({
          message: `cannot delete`,
          err
        })
      } else {
        res.status(200).send({
          message: 'success delete',
          result
        })
      }
    })
  },
  updateUser: (req, res) => {
    User.findByIdAndUpdate({_id: req.params.userId}, {name: req.body.name, password: req.body.password, email: req.body.email, phoneNumber: req.body.phoneNumber }, function(err, result){
      if(err) {
        res.status(400).send({
          message: `cannot find and update data`,
          err
        })
      } else {
          res.status(200).send({
            message: `update sukses`,
            result
          })
      }
    })
  }
}