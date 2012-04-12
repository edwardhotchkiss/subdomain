
/**
 * subdomain middleware
 * keep shipping next()
 */

module.exports = function(options) {

  if (options.base === undefined) {
    throw new Error('options.base required!');
  };

  // return middleware
  return function(request, response, next) {

    // get host
    var host = request.headers.host;

    // remove 'www' prefix from URL? (tacky, right?)
    if (options.removeWWW && options.removeWWW === true) {
      if (/^www/.test(host)){
        response.redirect('http://' + host.replace(/^www\./, '') + request.url);
        next();
      };
    };

    // subdomain specific middleware
    if (host === options.base || host === 'localhost:8000') {
      // not a subdomain
      next();
    } else {
      // test for subdomain
      var matches = host.match(new RegExp('(.*)\.' + options.base));
      // subdomain
      if (matches.length === 2) {
        request.url = '/subdomain/' + matches[1] + request.url;
        next();
      } else {
        next();
      }
    }; 
  };

};

/* EOF */