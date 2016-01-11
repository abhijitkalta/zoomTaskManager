
'use strict';
zoomTaskManagerApp.service('myCacheLikes', function (CacheFactory) {
// Check to make sure the cache doesn't already exist
  if (!CacheFactory.get('myCacheLikes')) {
    CacheFactory.createCache('myCacheLikes', {maxAge: 5000 , deleteOnExpire: 'aggressive', storageMode : 'localStorage'});
  }
  var myCacheLikes = CacheFactory.get('myCacheLikes');
  return myCacheLikes;
});
