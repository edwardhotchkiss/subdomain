
/*
 * subdomain middleware
 * keep shipping next()
 */

module.exports = function(options) {

  // options?
  options = options || {};

  if (!options.base) {
    throw new Error('options.base required!');
  } else {
    options.removeWWW = options.removeWWW || false;
    options.debug = options.debug || false;
    options.ignoreWWW = options.ignoreWWW || false;
  };

  // return middleware
  return function(request, response, next) {

    // get host & protocol
    var host = request.headers.host
      , protocol = request.socket.encrypted ? 'https' : 'http';

    // remove 'www' prefix from URL? (tacky, right?)
    if (options.removeWWW === true) {
      if (/^www/.test(host)) {
        return response.redirect(protocol + '://' + host.replace(/^www\./, '') + request.url);
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
      if (matches && matches.length === 2) {
        if(!options.ignoreWWW || !matches[1] === 'www'){
          request.url = '/subdomain/' + matches[1] + request.url;
        }
        next();
      } else {
        next();
      }
    };
  };

};
