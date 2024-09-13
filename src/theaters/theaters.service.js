const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const reduceProperties = require("../utils/reduce-properties");

const addMovies = mapProperties("movies", {
  movie_id: "movies.movie_id",
  title: "movies.title",
  runtime_in_minutes: "movies.runtime_in_minutes",
  rating: "movies.rating",
  description:"movies.description",
  image_url: "movies.image_url",
  created_at: "movies.movie_created_at",
  updated_at: "movies.movie_updated_at",
  is_showing: "movies_theaters.is_showing",
  theater_id: "movies_theaters.theater_id"
});

const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description:["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  created_at: ["movies", null, "movie_created_at"],
  updated_at: ["movies", null, "movie_updated_at"],
  is_showing: ["theaters", null, "is_showing"],
  theater_id: ["movies_theaters", null, "theater_id"]
})

async function list() {
     return knex("theaters")
    .join("movies_theaters","theaters.theater_id", "movies_theaters.theater_id" )
    .join("movies", "movies_theaters.movie_id", "movies.movie_id")
    .select(
      "theaters.theater_id",
      "theaters.name", 
      "theaters.address_line_1",
      "theaters.address_line_2",
      "theaters.city",
      "theaters.state",
      "theaters.zip",
      "theaters.created_at",
      "theaters.updated_at",
      "movies.movie_id",
      "movies.title",
      "movies.runtime_in_minutes",
      "movies.rating",
      "movies.description",
      "movies.image_url",
      "movies.created_at as movie_created_at",
      "movies.updated_at as movie_updated_at",
      "movies_theaters.theater_id",
      "movies_theaters.is_showing"
    ).then(reduceMovies);
 
}

module.exports = {
  list,
};
