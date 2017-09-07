var config = {};

config.db = {};
config.webhost = process.env.MONGODB_URI ? 'https://dry-wildwood-48075.herokuapp.com/' : 'http://localhost:3000/';

config.db.host = process.env.MONGODB_URI ? 'heroku_27pt6z84:s9s5t41b5sof8ip45mhu8dh0hb@ds127994.mlab.com:27994' : 'localhost';
config.db.name = process.env.MONGODB_URI ? 'heroku_27pt6z84' : 'url_shortener';

module.exports = config;