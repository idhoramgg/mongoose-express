const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UserImage = require('../models/userImage');

module.exports = {
  //create new
  addUser: async (req, res) => {
    try {
      const existedUser = await User.findOne({
        name: req.body.name
      });

      if (existedUser) {
        res.status(404).send({
          message: 'user already exist, login'
        });
      } else {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(req.body.password, salt, async function (err, hash) {
            if (!err) {
              const newUser = await User.create({
                name: req.body.name,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: hash
              });
              res.status(200).send({
                message: 'user created',
                newUser
              })

              // const userAvatar = await UserImage.create({
              //   filename: req.body.files[0].filename,
              //   path: req.body.files[0].url
              // });
              // await User.findOneAndUpdate({
              //   _id: user._id
              // }, {
              //   $push: {
              //     avatar: userAvatar._id
              //   }
              // }, {
              //   new: true
              // });
            } else {
              res.status(400).send({
                message: 'error'
              })
            }
          })
        })
      }
    } catch (error) {
      res.status(400).send({
        message: 'user failed to create',
        error: error.message
      })
    }
  },
  //populate collection address dengan users
  showAll: (req, res) => {
    User
      .find()
      .populate('addresses', 'address -_id')
      .populate('avatar')
      .then(result => {
        res.send(result)

      }).catch(error => console.log(error));
  },

  //read
  showDataById: (req, res) => {
    User.findById({
      _id: req.params.userId
    }, (err, result) => {
      if (err) {
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
    User.deleteOne({
      _id: req.params.userId
    }, (err, result) => {
      if (err) {
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
    User.findByIdAndUpdate({
      _id: req.params.userId
    }, {
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber
    }, (err, result) => {
      if (err) {
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
  },
  uploadImage: (req, res) => {
    UserImage.create({  
        filename: req.files[0].filename,
        path: req.files[0].path
      }).then(result => res.send(result))
      .catch(error => res.send(error))
  },

  login: async (req, res) => {
    /*cari exist user */
    try {
      const existedUser = await User.findOne({
        name: req.body.name
      });
      /* jika password new user == user yang sudah terdaftar */
      const valid = bcrypt.compareSync(req.body.password, existedUser.password);
      if (valid) {
        const token = await jwt.sign({
            data: existedUser
          },
          "secretcode", {
            expiresIn: "2h"
          }
        );
        res.send({
          token
        });
      } else {
        res.send({
          message: 'password is not valid',
        })
      }
    } catch (error) {
      res.send({
        error: true,
        message: 'belum daftar'
      })
    }
  }
}