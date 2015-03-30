var observableModule = require('data/observable');
var observableArrayModule = require('data/observable-array');
var config = require('../shared/config');

var model = new observableModule.Observable();

// var feedURL = config.instagram.getFeedURL();
// var selfFeed = new observableArrayModule.ObservableArray([]);

// var addItemToFeedArray = function(item, image) {
//   selfFeed.push({ 
//     thumbnail: image,
//     caption: item.caption.text,
//     standardResolution: item.images.standard_resolution.url
//   });
// };

// // get the feed from instagram
// httpModule.getJSON(feedURL).then(function(response) {
//   response.data.forEach(function(item) {
//     imageCache.getFromCache(item.images.thumbnail.url).then(function(image) {
//       addItemToFeedArray(item, image);
//     });
//   });
// });

// model.selfFeed = selfFeed;

module.exports = model;