// dont change without scrum master permisson
const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
var morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const users = require("./routes/users.routes");
const products = require("./routes/product.routes");
const posts = require("./routes/post.routes");
const reviews = require("./routes/review.routes");
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

const PORT = 5001;
app.use("/users", users);
app.use("/products", products);
app.use("/posts", posts);
app.use("/reviews", reviews);
app.listen(PORT, function () {
  console.log("server running on  http://localhost:" + PORT);
});
