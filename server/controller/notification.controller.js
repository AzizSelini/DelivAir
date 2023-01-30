const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const notification = prisma.notification;
const sendNotification = async (req, res) => {
  try {
    notification
      .create({
        data: {
          content: req.body.content,
          notification_reciver: req.body.notification_reciver,
          status: req.body.status,
        },
      })
      .then((result) => res.json(result));
  } catch (err) {
    res.json(err);
  }
};
const getNotifactionByReciver = async (req, res) => {
  try {
    notification
      .findMany({
        where: {
          notification_receiver: 1 * req.params.id,
        },
      })
      .then((result) => {
        res.json(result);
      });
  } catch (err) {
    res.json(err);
  }
};

const deleteNotification = async (req, res) => {
  try {
    notification
      .deleteMany({
        where: {
          notification_receiver: req.body.notificationender,
        },
      })
      .then((result) => res.json(result));
  } catch (err) {
    res.json(err);
  }
};
const updateNotification = async (req, res) => {
  try {
    products
      .updateMany({
        where: {
          notification_receiver: req.body.notification_receiver,
        },
        data: {
          content: req.body.content,
          status: req.body.status,
        },
      })
      .then((result) => {
        res.json(result);
      });
  } catch (err) {
    res.json(err);
  }
};
module.exports = {
  updateNotification,
  getNotifactionByReciver,
  deleteNotification,
  sendNotification,
};
