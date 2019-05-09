/* eslint-disable no-underscore-dangle */
const models = require('../models');
const PurchaseMail = require('../jobs/PurchaseMail');
const Queue = require('../services/Queue');

class PurchaseController {
  async store(req, res) {
    const { ad, content } = req.body;

    const purchaseAd = await models.Ad.findById(ad).populate('author');
    const user = await models.User.findById(req.userId);

    const purchase = await models.Purchase.create({
      ad,
      content,
      user: user._id,
    });

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content,
    }).save();

    return res.json(purchase);
  }
}

module.exports = new PurchaseController();
