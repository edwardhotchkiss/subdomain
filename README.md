
# subdomain

> Node.JS Express Subdomain Middleware.

I thought that this is a pretty sweet project [express-subdomain-handler](https://github.com/WilsonPage/express-subdomain-handler) but I wanted it crafted a bit differently for my purposes and the ability to force HTTPS and removal of the unneccessary 'www' prefix. Thanks for the inspiration @WilsonPage

```javascript

var subdomain = require('subdomain');

var express = require('express')
  , app = express.createServer();

app.use(subdomain({ base : 'unfol.io', removeWWW : true, forceHTTPS : false }));

app.get('/subdomain/blog/', function(request, response) {
  response.send({ host : request.host });
});

app.listen(8000);

```