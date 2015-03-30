var imageCacheModule = require('ui/image-cache');

var cache = new imageCacheModule.Cache();
cache.maxRequests = 5;

var getFromCache = function(url) {

  return new Promise(function(resolve, reject) {

    var image = cache.get(url);

    if (image) {
      resolve(image);
    }

    else {
      cache.push({
        key: url,
        url: url,
        completed: function(result, key) {
          if (url === key) {
            resolve(result);
          }
        }
      });
    }
  });
};

module.exports = {
  getFromCache: getFromCache
};