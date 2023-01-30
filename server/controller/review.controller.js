const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const reviews = prisma.reviews;
const addReview = async (req, res) => {
  try {
    reviews
      .create({
        data: {
          content: req.body.content,
          reviewSender: req.body.reviewSender,
          reviewReceiver: req.body.reviewReceiver,
        },
      })
      .then((result) => res.json(result));
  } catch (err) {
    res.json(err);
  }
};
const getByReviewReciver = async (req, res) => {
  try {
    reviews
      .findMany({
        where: {
          reviewReceiver: 1 * req.params.id,
        },
      })
      .then((result) => {
        res.json(result);
      });
  } catch (err) {
    res.json(err);
  }
};
const getByReviewSender = async (req, res) => {
  try {
    reviews
      .findMany({
        where: {
          reviewSender: 1 * req.params.id,
        },
      })
      .then((result) => {
        res.json(result);
      });
  } catch (err) {
    res.json(err);
  }
};
const deleteReview = async (req, res) => {
  try {
    reviews
      .deleteMany({
        where: {
          reviewSender: req.body.reviewSender,
          reviewReceiver: req.body.reviewReceiver,
        },
      })
      .then((result) => res.json(result));
  } catch (err) {
    res.json(err);
  }
};
const updateReview = async (req, res) => {
  try {
    products
      .updateMany({
        where: {
          reviewReceiver: req.body.reviewReceiver,
          reviewSender: req.body.reviewSender,
        },
        data: {
          content: req.body.content,
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
  deleteReview,
  addReview,
  getByReviewReciver,
  updateReview,
  getByReviewSender,
};
