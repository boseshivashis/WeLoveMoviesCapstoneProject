const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");


const tableName = "reviews";

const addCritics = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at"
});

async function destroy(reviewId) {
  // TODO: Write your code here
  return knex("reviews").where('reviews.review_id', reviewId).del();
  //return db("reviews").where({ review_id: reviewId }).del();
}

async function list(movie_id) {
  // TODO: Write your code here
 return knex("movies")
   .join("reviews", "movies.movie_id", "reviews.movie_id")
   .join("critics", "critics.critic_id", "reviews.critic_id")
   .select("reviews.*", "critics.*")
   .where('movies.movie_id', movie_id)
   .then(results => results.map(addCritics) );
}

async function read(reviewId) {
  // TODO: Write your code here
 // return //knex("reviews").select("*").where('reviews.review_id',reviewId).first().then(setCritic);
  
  return knex("reviews")
  .join("critics", "reviews.critic_id", "critics.critic_id")
  .select("reviews.*", "critics.*")
  .where({review_id: reviewId})
  .first()
  .then(addCritics);
}

async function readCritic(critic_id) {
  console.log("Critic Id in Read Critic is ", critic_id);
  return knex("critics").where("critic_id", critic_id).first();
  //return knex("critics").where({critic_id: critic_id}).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  // Extract relevant fields from review
  const { review_id, content, score } = review;


  // Perform the update operation
  await knex(tableName)
    .where({ review_id })
    .update({ content, score });

  // Fetch the updated record
  const updatedReview = await knex(tableName)
    .where({ review_id })
    .first(); // Use .first() to get a single record

    // Destructure the first updated review from the array

  // Fetch the critic associated with the updated review
  const critic = await readCritic(updatedReview.critic_id);
  
  // Add the critic to the updated review object
  updatedReview.critic = critic;

  return updatedReview;
}

module.exports = {
  destroy,
  list,
  read,
  update,
};
