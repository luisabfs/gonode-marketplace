const Ad = require('../models/Ad');
const User = require('../models/User');
const Mail = require('../services/Mail');

class PurchaseController {
  async store(req, res) {
    const { ad, content } = req.body;

    const purchaseAd = await Ad.findById(ad).populate('author');
    const user = await User.findById(req.userId);

    await Mail.sendMail({
      from: '"Luísa Barros" <qlullyq@gmail.com>',
      to: purchaseAd.author.email,
      subject: `Purchase request: ${purchaseAd.title}`,
      html: `<p>${content}</p>`,
    });

    return res.send();
  }
}

module.exports = new PurchaseController();
