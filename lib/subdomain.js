
/**
 * subdomain middleware
 * keep shipping next()
 */

module.exports = function(options) {

  if (options.base === undefined) {
    throw new Error('options.base required!');
  } else {
    var matches = options.base.split('.');
    if (matches.length !== 2) {
      throw new Error('unrecognized domain name!');
    } else {
      options.prefix = matches[0];
      options.sufix = matches[1];
    }
  }

  // return middleware
  return function(request, response, next) {

    // get host
    var host = request.headers.host;

    // remove 'www' prefix from URL? (tacky, right?)
    if (options.removeWWW && options.removeWWW === true) {
      if (/^www/.test(host)){
        return response.redirect('http://' + host.replace(/^www\./, '') + request.url);
      };
    };

    // subdomain specific middleware
    if (host === options.base || host === 'localhost:8000') {
      // not a subdomain
      next();
    } else {
      // get subdomain
      var matches = host.match(new RegExp('(.*)\.' + options.prefix + '\.' + options.sufix));
      if (matches.length === 2) {
        var _subdomain = matches[1];
        response.send(_subdomain);
      } else {
        next();
      }
    }; 
  };

};

/* EOF */