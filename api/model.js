const uuid = require("uuid");

function getId() {
  return uuid.v1();
}

function usersFunc() {
  return [
    { id: getId(), kullaniciadi: "irem1", sifre: "1234" },
    { id: getId(), kullaniciadi: "irem2", sifre: "1234" },
    { id: getId(), kullaniciadi: "irem3", sifre: "1234" },
    { id: getId(), kullaniciadi: "irem4", sifre: "1234" },
  ];
}

let users = usersFunc();

function getAllUsers() {
  return users;
}
function createNewUser(user) {
  user.id = getId();
  users.push(user);
  return user;
}
function findUser(user) {
  for (let i = 0; i < users.length; i++) {
    if (
      user.kullaniciadi == users[i].kullaniciadi &&
      user.sifre == users[i].sifre
    ) {
      let find = users[i];
      return find;
    } else {
      return false;
    }
  }
}

function checkSameUserName(user) {
  let isSameExist = users.find(
    (item) => item.kullaniciadi === user.kullaniciadi
  );
  return isSameExist !== undefined;
  //!veya
  // return !!isSameExist;
}

module.exports = {
  checkSameUserName,
  findUser,
  createNewUser,
  getAllUsers,
  users,
};
