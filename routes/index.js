var config = require('../config');
var express = require('express');
var router = express.Router();
var request = require('request');

var Url = require('../models/url');

router.get('/:shortenedUrl', function (req, res, next) {
  Url.findOne({short_url: req.params.shortenedUrl}, function (err, doc) {
    if (!doc) {
      return  res.redirect(config.webhost);
    }

    return res.redirect(doc.long_url);
  });
});


router.post('/api/shorten', function (req, res, next) {
  var longUrl = req.body.longUrl;
  console.log(longUrl);
  request.get(longUrl, function(err, resp, body) {
    if(err) return res.send({ error: true, message: 'Url is not valid' });
    Url.findOne({ long_url: longUrl }, function (err, doc){
      if (doc){
        return res.send({shortUrl: config.webhost + doc.short_url});
      }
      var newUrl = Url({
        long_url: longUrl
      });
      newUrl.save(function(err) {
        if (err){
          console.log(err);
        }
        return res.send({ shortUrl: config.webhost + newUrl.short_url });
      });
    });
  });
});

router.post('/api/shorten_desired', function (req, res, next) {
  var shortUrl = req.body.shortUrl;
  var longUrl = req.body.longUrl;

  Url.findOne({ short_url: shortUrl }, function (err, doc){
    if (doc){
      return res.send({ shortUrl: config.webhost + doc.short_url });
    }
    Url.findOneAndUpdate({ long_url: longUrl }, { short_url: shortUrl }, function(err, doc){
      res.send({ shortUrl: config.webhost + shortUrl });
    })
  });

});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

module.exports = router;
