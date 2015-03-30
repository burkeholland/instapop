var imageCache = require('../shared/imageCache');
var detailsModel = require('../models/detailsModel');

var loadImage = function(url) {
  imageCache.getFromCache(url).then(function(image) {
    detailsModel.set('image', image);
  });
};

exports.navigatedTo = function(args) {
  try {
    var page = args.object;
    var context = page.navigationContext;

    detailsModel.set('caption', context.caption);
    loadImage(context.standardResolution);

    page.bindingContext = detailsModel;
  }
  catch (e) {
    alert(JSON.stringify(e));
  }
};