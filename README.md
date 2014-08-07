
# subdomain [![Git Tip](http://img.shields.io/gittip/edwardhotchkiss.svg)](https://www.gittip.com/edwardhotchkiss/) 

> Node.js Express Subdomain Middleware.

I thought that this was a pretty sweet project [express-subdomain-handler](https://github.com/WilsonPage/express-subdomain-handler) but I wanted it crafted a bit differently for my purposes and the ability to force HTTPS and removal of the unneccessary 'www' prefix. Thanks for the inspiration @WilsonPage

#### /etc/hosts

```bash
127.0.0.1 localhost
127.0.0.1 blog.localhost
127.0.0.1 writing.localhost
```

#### server

```javascript
/**
 *
 * @example basic
 *
 * @description limited example
 * $ npm install express
 *
 */

var app
  , express = require('express')
  , subdomain = require('../lib/subdomain');

app = express();

app.use(subdomain({ base : 'localhost', removeWWW : true }));

app.get('/subdomain/blog/', function(request, response) {
  response.end('BLOG.LOCALHOST: "/"');
});

app.get('/', function(request, response) {
  response.end('LOCALHOST: "/"');
});

app.get('/hello', function(request, response) {
  response.end('LOCALHOST: "/hello"');
});

app.listen(8000, function() {
  console.log('> listening on port 8000');
});
```

### available options

  * `base` - Required, the base domain name i.e. 'localhost'
  * `removeWWW` - Defaults to `false`
  * `ignoreWWW` - Defaults to `false`
  * `prefix` - Defaults to 'subdomain'
  * `debug` - Defaults to `false`


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/edwardhotchkiss/subdomain/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

