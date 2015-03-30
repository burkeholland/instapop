var mainModel = require('../models/mainModel');
var frameModule = require('ui/frame');
var config = require('../shared/config');

var loaded = function(args) {
  var page = args.object;
  page.bindingContext = mainModel;

  if (config.instagram.accessToken()) {
    frameModule.topmost().naviate('app/views/feed');
  }
};

var login = function() {
  frameModule.topmost().navigate('app/views/login');
};

module.exports = {
  loaded: loaded,
  login: login
};