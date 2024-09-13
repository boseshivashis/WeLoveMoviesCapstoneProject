const knex = require("../db/connection");

async function list(is_showing) {
  if(is_showing) {
    return knex("movies").join("movies_theaters", "movies.movie_id","movies_theaters.movie_id").where({ "movies_theaters.is_showing": true }).groupBy("movies.movie_id");
  } else {
    return knex("movies").select("*");
  }
}


async function read(movie_id) {
  // TODO: Add your code here
  return knex("movies").select("movies.*").where({movie_id: movie_id}).first();
}

module.exports = {
  list,
  read,
//  listAll
};
