const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const posts = prisma.posts;

const getAllPosts = async (req, res) => {
  try {
    posts.findMany({}).then((result) => {
      res.json(result);
    });
  } catch (err) {
    res.json(err);
  }
};

const updatePost = async (req, res) => {
  try {
    const result = await posts.update({
      where: { post_id: +req.params.id },
      data: req.body,
    });
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

const deletePost = async (req, res) => {
  try {
    const result = await posts.delete({
      where: {
        post_id: +req.params.id,
      },
    });
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};
const newPost = async (req, res) => {
  try {
    posts
      .create({
        data: {
          type: req.body.type,
          departCountry: req.body.departCountry,
          departTime: req.body.departTime,
          arriveCountry: req.body.arriveCountry,
          arriveTime: req.body.arriveTime,
          content: req.body.content,
          paymentWays: req.body.paymentWays,
          acceptedItems: req.body.acceptedItems,
          weight: req.body.weight,
          postTime: req.body.postTime,
          poster_id: req.body.poster_id,
          poster_image: req.body.poster_image,
          poster_name: req.body.poster_name,
          flight_id: req.body.flight_id,
        },
      })
      .then((result) => res.json(result));
  } catch (err) {
    res.json(err);
  }
};

module.exports = { getAllPosts, newPost, deletePost, updatePost };
