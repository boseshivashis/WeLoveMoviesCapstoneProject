const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  // TODO: Add your code here.
  const movieId = request.params.movieId;

  if(movieId) {
    const movieRecord = await service.read(movieId);
    if(movieRecord) {
      response.locals.movieRecord = movieRecord;
      //return next();
      next();
    } else {
      next({
        status: 404,
        message: `Movie Record not found for ${movieId}`
      })
    }
  } else {
    methodNotAllowed(request, response, next);
  }

  //next({});
}

async function read(request, response) {
  // TODO: Add your code here
  response.status(200).json({ data: response.locals.movieRecord });
}

async function list(request, response) {
  // TODO: Add your code here.
  const  {is_showing}  = request.query;
  
  if(is_showing && is_showing === 'true') {
    response.status(200).json({data: await service.list(true)});
  } else {
    response.status(200).json({data: await service.list()});
  }

}

function checkCritics(reqest, response, next) {
  return next({
    status: 404,
    message: `Critics path is not supported`
  });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  checkCritics,
};
