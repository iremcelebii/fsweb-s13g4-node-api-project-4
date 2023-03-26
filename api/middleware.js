const model = require("./model");

function logger(req, res, next) {
  const method = req.method;
  const url = req.originalUrl;
  //!gün ve saati alabilmek için:
  const time = new Date().toLocaleString();
  console.log(`Request object:{method: ${method}, url: ${url}, time: ${time}}`);
  //!bir sonrakine geç
  next();
}

function validateNewUser(req, res, next) {
  try {
    const { kullaniciadi, sifre } = req.body;
    if (kullaniciadi && sifre) {
      req.user = { kullaniciadi: kullaniciadi, sifre: sifre };
      next();
    } else if (!kullaniciadi) {
      res.status(404).json({ message: "lütfen kullaniciadi giriniz " });
    } else {
      res.status(404).json({ message: "lütfen sifre giriniz " });
    }
  } catch (err) {
    next(err);
  }
}

function checkUserName(req, res, next) {
  try {
    const isSame = model.checkSameUserName(req.body);
    if (isSame) {
      res
        .status(404)
        .json({ message: "lütfen farklı bir kullaniciadi giriniz " });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

function checkKayitliUser(req, res, next) {
  try {
    const user = req.body;
    for (let i = 0; i < model.users.length; i++) {
      if (user.kullaniciadi == model.users[i].kullaniciadi) {
        if (user.sifre == model.users[i].sifre) {
          next();
        } else {
          res.status(404).json({ message: "Şifrenizi yanlış girdiniz " });
        }
      } else {
        res.status(404).json({
          message: "Kullanıcı adınızı veya şifrenizi yanlış girdiniz ",
        });
      }
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { logger, checkUserName, validateNewUser, checkKayitliUser };
