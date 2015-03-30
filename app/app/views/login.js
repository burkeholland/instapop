var loginModel = require('../models/loginModel');
var dialogs = require('ui/dialogs');
var config = require('../shared/config');
var url = require('url');  
var frames = require('ui/frame');

function loaded(args) {
  var page = args.object;
  page.bindingContext = loginModel;
}

function finished(args) {
  if (args.url.indexOf('access_token') > 0) {
    config.instagram.accessToken(url.parse(args.url).hash.substring(1).split('=')[1]);
    frames.topmost().navigate('app/views/feed');
  }
}

var debug = function(msg) {
  dialogs.alert({ 
    title: 'debug',
    message: msg,
    okButtonText: 'OK'
  });
};

module.exports = {
  loaded: loaded,
  finished: finished
}