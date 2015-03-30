var o = require('data/observable');
var config = require('../shared/config');

var model = new o.Observable();

model.authURL = config.instagram.getAuthURL();

module.exports = model;