var frameModule = require('ui/frame');
var httpModule = require('http');
var observableArrayModule = require('data/observable-array');
var view = ('ui/core/view');
var config = require('../shared/config');
var imageCache = require('../shared/imageCache');
var feedModel = require('../models/feedModel');

var feedURL = config.instagram.getFeedURL();

var selfFeed = new observableArrayModule.ObservableArray([]);

feedModel.set('feed', selfFeed);

// get the feed from instagram
httpModule.getJSON(feedURL).then(function(response) {
  response.data.forEach(function(item) {

    var feedItem = { 
      caption: item.caption.text,
      username: item.user.username 
    };

    imageCache.getFromCache(item.images.standard_resolution.url).then(function(image) {
      feedItem.standardResolution = image;
    });

    imageCache.getFromCache(item.user.profile_picture).then(function(image) {
      feedItem.profilePicture = image;
    });
      // selfFeed.push({
      //   thumbnail: image,
      //   caption: item.caption.text,
      //   standardResolution: item.images.standard_resolution.url,
      //   profilePicture: imageCache.getFromCache(item.user.profile_picture).then(function(image) {
      //     return image;
      //   })
      // });
    // });

    selfFeed.push(feedItem);
  });
});

exports.loaded = function(args) {

  var page = args.object;
  page.bindingContext = feedModel;

  page.ios.title = 'Feed';

  var controller = frameModule.topmost().ios.controller;

  controller.navigationBar.translucent = true;
};

exports.itemTap = function(args) {

  try {
    frameModule.topmost().navigate({
      moduleName: 'app/views/feed-details',
      context: selfFeed.getItem(args.index)
    });
  }
  catch (e) {
    alert(JSON.stringify(e));
  }
  
};