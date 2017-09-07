var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";

function shortenUrl() {
  var shortUrl = '';
  var length = Math.random()*3+2;
  for(var i = 0; i < length; i++)
    shortUrl += alphabet.charAt(Math.random() * alphabet.length);
  return shortUrl;
}

module.exports.shortenUrl = shortenUrl;