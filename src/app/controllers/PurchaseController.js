const models = require('../models');
const PurchaseMail = require('../jobs/PurchaseMail');
const Queue = require('../services/Queue');

class PurchaseController {
  async store(req, res) {
    const { ad, content } = req.body;

    const purchaseAd = await models.Ad.findById(ad).populate('author');
    const user = await models.User.findById(req.userId);

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content,
    }).save();

    const purchase = await models.Purchase.create(req.body);

    return res.json(purchase);
  }

  async show(req, res) {
    const userAd = await models.Ad.find({ author: req.userId });
    const purchases = await models.Purchase.find({ ad: { ...userAd }.id });

    console.log({});

    const purchase = models.Purchase.paginate({
      page: req.query.page || 1,
      limit: 20,
      sort: '-createdAt',
    });

    return res.json(purchase);
  }
}

module.exports = new PurchaseController();
