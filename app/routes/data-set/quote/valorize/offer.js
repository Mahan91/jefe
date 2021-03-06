import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  beforeModel() {
    const valorizationRecord = this.modelFor('data-set.quote.valorize');
    valorizationRecord.get('version').then((versionRecord) => {
      if (!versionRecord || !valorizationRecord.get('releasedAt')) {
        this.transitionTo('data-set.quote.valorize');
      }
    });
  },
  actions: {
    selectOffer(offer) {
      const valorizationRecord = this.modelFor('data-set.quote.valorize');
      valorizationRecord.set('offer', offer);
      this.transitionTo('data-set.quote.valorize.criteria');
    },
  },
});
