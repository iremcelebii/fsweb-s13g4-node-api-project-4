const express = require("express");
const cors = require("cors");
const {
  logger,
  checkUserName,
  validateNewUser,
  checkKayitliUser,
} = require("./middleware");
const model = require("./model");

const server = express();
server.use(express.json());
//! en başa yazdık ki her türlü çalışsın
server.use(logger);

server.get("/api/kullanicilar", (req, res, next) => {
  try {
    res.json(model.getAllUsers());
  } catch (err) {
    next(err);
  }
});

server.post(
  "/api/kayitol",
  validateNewUser,
  checkUserName,

  (req, res, next) => {
    try {
      let user = req.user;
      let createdUser = model.createNewUser(user);
      res.status(201).json(createdUser);
    } catch (err) {
      next(err);
    }
  }
);

server.post(
  "/api/giris",

  validateNewUser,
  checkKayitliUser,

  (req, res, next) => {
    try {
      res.status(201).json({ message: "hoşgeldiniz " + req.body.kullaniciadi });
    } catch (err) {
      next(err);
    }
  }
);

server.use((req, res, next) => {
  res.status(404).send("Aradığınız adres bulunamadı");
});

server.use((err, req, res, next) => {
  let status = err.status || 500;
  res
    .status(status)
    .json({ customMessage: "işlem yapılamadı", message: err.message });
});
module.exports = server;
