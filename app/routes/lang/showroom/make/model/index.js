import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.modelFor('lang.showroom.make.model')
  }
});
