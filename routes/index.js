var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var postfix;
var ip;

router.get('/', function(req, res) {
  // Serve index page
  postfix = Date.now();
  ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('FROM ROOT ' + ip);
  res.render('index', { title: 'Wallpaper generator', ip: ip });

})

router.get('/create', function(req, res) {
  console.log('FROM CREATE ' + ip);
  // Make request to the wallbase.cc to get the random list of wallpapers
  var site = 'http://wallbase.cc/search?q=nature&order=random';
  // var imageLink = 'images/bg1.jpg';

  // Get the first random wallpaper URL
  request(site, function(error, response, html) {
    if(!error) {
      var $ = cheerio.load(html);
      var link = $('a[href^="http://wallbase.cc/wallpaper/"]', '.wrapper').attr('href');

      request(link, function(error, response, html) {
        if(!error) {
          var $ = cheerio.load(html);
          var imgLink = $('img.wall', '.content').attr('src');
          //res.send(imgLink);
          console.log(imgLink);
          // Get file extension (.jpg, .png)
          // var imgExt = imgLink.replace(/.*\.([^.]*)$/, '.$1');
          var imgExt = '.jpg' // Assume all images are jpg for now
          // Where to save on server
          var newPath = 'public/images/bg' + ip + imgExt;

          var download = function(uri, filename, callback) {
            request.head(uri, function(err, res, body) {
              request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
            });
          };
          download(imgLink, newPath, function() {
            console.log('file written ' + newPath);
          });
        }
      })
    }

  })

})

module.exports = router;
