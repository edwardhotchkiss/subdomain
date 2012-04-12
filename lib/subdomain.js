
/**
 * subdomain middleware
 * keep shipping next()
 */

module.exports = function(request, response, next) {
  var host = request.headers.host;
  if (host === ) {
    next();
  } else {
    console.log(host);
    var matches = host.match(/(.*)\.domain\.com/);
    if (matches.length === 2) {
      var _subdomain = matches[1];
      response.send(_subdomain);
    } else {
      next();
    }
  }; 
};

/* EOF */