module.exports = function(req, res, next) {
  if(!req.subDomain){
    return next ? next('route') : false;
  }
  if (next) next();
};