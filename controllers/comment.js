const Comment = require('../models/comment')

module.exports = {
  addComment: async (req, res) => {
    const comment = await Address.create({email, comment} = req.body);
    );
    if(comment) {
      res.status(200).send({
      message: `success bujang`,
      comment
    })
    }
    else {
      res.status(500).send({
        message: 'error'
      })
    }
    
  },
};
