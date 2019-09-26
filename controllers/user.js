const User = require('../models/user');
const UserImage = require('../models/userImage');

module.exports = {
  //create new
  addUser: async (req, res) => {
    try {
      //tunggu sampai user dibuat
      
      const user = await User.create( {
        name: req.body.name,
        email:req.body.email,
        password:req.body.password,
        phoneNumber: req.body.phoneNumber
      });
      await user.avatar.push(user._id);

      //setelah user dibuat, kirim user id ke user image
      const userAvatar = await UserImage.create({
        _id: user._id,
        filename: req.files[0].filename,
        path: req.files[0].path
      });
      res.status(200).send({
        message: 'user created',
        user,
        userAvatar
      });

    } catch (error){
      console.log(error)
    }
  },
  //populate collection address dengan users
  showAll: (req, res) => {
    User
      .find()
      .populate('addresses', 'userImage','address -_id')
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
  }
}