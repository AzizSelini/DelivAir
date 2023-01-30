const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const users = prisma.users;

const getAll = async (req, res) => {
  try {
    users.findMany({}).then((result) => {
      res.json(result);
    });
  } catch (err) {
    res.json(err);
  }
};

const getOneByemail = async (req, res) => {
  try {
    users.findFirst({ where: { email: req.params.email } }).then((result) => {
      res.json(result);
    });
  } catch (err) {
    res.json(err);
  }
};

const add = async (req, res) => {
  try {
    users
      .create({
        data: {
          userName: req.body.userName,

          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          image: req.body.image,
          ratings: [],
          pendingRequests: [],
          location: req.body.location,
          contactList: [],
          verified: false,
          banned: false,
        },
      })
      .then((result) => res.json(result));
  } catch (err) {
    res.json(err);
  }
};

const verify = (req, res) => {
  users
    .update({
      where: { user_id: +req.params.id },
      data: { verified: true },
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};
const ban = (req, res) => {
  users
    .update({
      where: { user_id: +req.params.id },
      data: { banned: req.body.ban },
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};
const deleteAccount = async (req, res) => {
  try {
    const result = await users.delete({
      where: {
        user_id: +req.params.id,
      },
    });
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

const updateFriends = async (req, res) => {
  try {
    const result = await users.update({
      where: { user_id: +req.params.id },
      data: req.body,
    });
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

const getOneById = async (req, res) => {
  try {
    const result = await users.findUnique({
      where: { user_id: +req.params.id },
    });
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

module.exports = {
  getAll,
  add,
  verify,
  getOneByemail,
  deleteAccount,
  updateFriends,
  getOneById,
  ban,
};
