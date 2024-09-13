const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// TODO: Add your routes here
router.route("/").get(controller.list);
console.log("In Review Router Before  /:reviewId");

router.route("/:reviewId")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.destroy)
  .all(methodNotAllowed);

module.exports = router;