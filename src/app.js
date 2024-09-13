if (process.env.USER) require("dotenv").config();

const express = require("express");
const app = express();
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

const cors = require("cors");

app.use(cors());
app.use(express.json());

// TODO: Add your code here
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

app.use((err, req, res, next) => {
    res.status(err.status).json({ error: err.message });
});

app.use((req, res, next) => {
  res.status(404).json(`Path is not supported for ${req.getOriginalUrl}`)
});


module.exports = app;
