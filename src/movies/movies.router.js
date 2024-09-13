const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

// TODO: Add your routes here
router.route("/").get(controller.list).all(methodNotAllowed);
//router.route("/?is_showing=true").get(controller.list).all(methodNotAllowed);
router.route("/:movieId").get(controller.read);
router.route("/:movieId/critics").get(controller.checkCritics);

// Add theatre related routes
router.use("/:movieId/theaters", theatersRouter);

// Add Review related routes
router.use("/:movieId/reviews", reviewsRouter);
module.exports = router;
