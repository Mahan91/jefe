import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from 'jefe/config/environment';
import { isPresent } from '@ember/utils';
// import Ember from 'ember';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  host: ENV.API_URL,
  namespace: 'checkout/3.0',
  coalesceFindRequests: true,
  authorize(xhr) {
    const accessToken = this.get('session.data.authenticated.access_token');
    if (isPresent(accessToken)) {
      xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
    }
  },
  isInvalid(status, headers, payload) {
    const notify = this.get('notify');
    notify.alert(payload.errors[0].detail.message, {
      type: 'danger',
      icon: 'warning',
      title: payload.errors[0].title,
    });
  },
});
