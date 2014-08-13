
# subdomain [![Git Tip](http://img.shields.io/gittip/edwardhotchkiss.svg)](https://www.gittip.com/edwardhotchkiss/)

> Node.js Express Subdomain Middleware.

## What does it do?
  Subdomain can: 
  
  1. Append the request's subdomain to the path, so express can route it based on the subdomain.
  2. Handle the www subdomain in two special ways:
    * Remove the www subdomain by redirecting users.
    * Ignore the www subdomain, routing requests as if no subdomain was used.
  3. Use a path prefix that you supply.

## How do I use it?
Install it from npm:
```shell
npm install subdomain
```
Include it in your express app configuration:

```javascript
var app,
  , express = require('express');

app = express();

var subdomainOptions = {
  base: 'yourdomain.com' //base is required, you'll get an error without it.
};

app.use(require('subdomain')(subdomainOptions));
```

*Order matters with express, so make sure you are injecting the middleware before any routes that depend on it.*

Now you can do things like:
```javascript
app.get('/subdomain/:domain/dashboard', function(req, res, next){
  //Show a subdomain specific dashboard.
  //example: customer1.mydomain.com would see their dashboard.
  res.end(req.params.domain + '.mydomain.com: "/dashboard"');
});
```

or

```javascript
app.get('/subdomain/blog/', function(request, response) {
  response.end('BLOG.LOCALHOST: "/"');
});
```

## Options
You can pass any of these options to the function returned by `require('subdomain')`:

Option      | Default Value    | Description
------------|------------------|------------
base        | **required**       | Supply your top level domain.
removeWWW   | false            | Should the www subdomain be removed and the user redirected to the base?
ignoreWWW   | false            | Should the www subdomain be ignored and the request routed without the `/subdomain/:domain` component added to the front of the path?
prefix      | "subdomain"      | What prefix should subdomain put in the path?
debug       | false            | Not currently implemented.

## Credits

I thought that this was a pretty sweet project [express-subdomain-handler](https://github.com/WilsonPage/express-subdomain-handler) but I wanted it crafted a bit differently for my purposes and the ability to force HTTPS and removal of the unneccessary 'www' prefix. Thanks for the inspiration @WilsonPage

Take a look at the [contributors](https://github.com/edwardhotchkiss/subdomain/graphs/contributors) who make this project possible.

## Complete Usage Example

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
 * $ npm install subdomain
 *
 */

var app
  , express = require('express')
  , subdomain = require('subdomain');

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


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/edwardhotchkiss/subdomain/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
