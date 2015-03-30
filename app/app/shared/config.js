var localSettingsModule = require('local-settings');

var storedAccessToken;

var instagram = {
  accessToken: function(accessToken) {
    if (accessToken) {
      localSettingsModule.setString('accessToken', accessToken);
      storedAccessToken = accessToken;
    }
    return storedAccessToken;
  },
  api: {
    AUTH_URL: 'https://instagram.com/oauth/authorize/',
    URL: 'https://api.instagram.com/v1/',
    CLIENT_ID: '4e0171f9fcfc4015bb6300ed91fbf719',
    SECRET: '3941a9131b934cc8a7d9a09bb627e0d3',
    REDIRECT_URI: 'http://a.shinynew.me/instapop'
  },
  getAuthURL: function() {
    return this.api.AUTH_URL + '?client_id=' + this.api.CLIENT_ID + '&redirect_uri=' + this.api.REDIRECT_URI + '&response_type=token';
  },
  getFeedURL: function() {
    return this.api.URL + 'users/self/feed?access_token=' + this.accessToken();
  }
};

module.exports = {
  instagram: instagram
};