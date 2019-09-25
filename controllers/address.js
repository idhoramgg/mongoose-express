const Address = require('../models/address')
const User = require("../models/user")

module.exports = {
  addAddress: async (req, res) => {
    //buat alamat untuk mendapatkan id baru
    const address = await Address.create({address: req.body.address});
    //lempar addrres_id to user
    const user = await User.findOneAndUpdate(
      {_id: req.body._id},
      {$push: {addresses: address._id}},
      {new: true}
    );
    res.status(200).send({
      message: `success bujang`,
      address,
      user
    })
  }
};