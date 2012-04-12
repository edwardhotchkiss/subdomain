
# subdomain

> Node.JS Express Subdomain Middleware.

I thought that this is a pretty sweet project [express-subdomain-handler](https://github.com/WilsonPage/express-subdomain-handler) but I wanted it crafted a bit differently for my purposes and the ability to force HTTPS and removal of the unneccessary 'www' prefix. Thanks for the inspiration @WilsonPage

```javascript

var subdomain = require('subdomain');

var express = require('express')
  , app = express.createServer();

app.use(subdomain({ base : 'mydomain.com', removeWWW : true, forceHTTPS : false }));

app.get('/subdomain/blog/', function(request, response) {
  response.end('<h1>http://blog.mydomain.com/</h1>');
});

app.get('/hello', function(request, response) {
  response.end('<h1>http://mydomain.com/hello/</h1>');
});

app.listen(8000);

```