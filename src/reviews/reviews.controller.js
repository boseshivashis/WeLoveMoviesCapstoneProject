const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

async function reviewExists(request, response, next) {
  // TODO: Write your code here
  const reviewId = request.params.reviewId;


  if(reviewId) {
    const reviewRecord = await service.read(Number(reviewId));
    if(reviewRecord) {
      response.locals.reviewRecord = reviewRecord;
      return next();
    } else {
      next({
        status: 404,
        message: `Review Record cannot be found ${reviewId}`
      })
    }
  } else {
    methodNotAllowed(request, response, next);
  }


  //next({ });
}

async function destroy(request, response) {
  // TODO: Write your code here
  const recordForDelete = response.locals.reviewRecord;
  await service.destroy(recordForDelete.review_id);
  response.status(204).send();
}

async function list(request, response) {
  // TODO: Write your code here
  const movieId = request.params.movieId;

  if (movieId) {
    response.status(200).json({data: await service.list(movieId)})
  } else {
    methodNotAllowed(request, response, next)
  }

  //response.json({  });
}

function hasMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return next();
  }
  methodNotAllowed(request, response, next);
}

function noMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return methodNotAllowed(request, response, next);
  }
  next();
}


async function update(request, response) {

 

  try{
   


  const { data } = request.body;
  const updatedRecord = { ...response.locals.reviewRecord, ...data };


  const recordAfterUpdate = await service.update(updatedRecord);
  
  console.log("After update ", recordAfterUpdate)
  return response.status(200).json({data: recordAfterUpdate}) ;

  } catch(error) {
    console.log(error)
  }
  

}

async function read(request, response) {
  return response.status(200).json({data: response.locals.reviewRecord});
  
}

module.exports = {
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
   read: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(read),
  ],
};
