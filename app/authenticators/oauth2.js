import OAuth2PasswordGrand from 'ember-simple-auth/authenticators/oauth2-password-grant';

export default OAuth2PasswordGrand.extend({
  serverTokenEndpoint: 'https://integration-oauth.largus.fr/oauth/token',

  authenticate(applicationId, applicationSecret, username, password) {
    const applicationAuth = btoa(`${applicationId}:${applicationSecret}`);
    const headers = { Authorization: `Basic ${applicationAuth}` };

    return this._super(username, password, '', headers);
  },

  makeRequest(url, data, headers) {
    data.type = 'pro';
    return this._super(url, data, headers);
  },
});
