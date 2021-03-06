import { computed } from '@ember/object';
import DS from 'ember-data';
import HasManyQuery from 'ember-data-has-many-query';

export default DS.Model.extend(HasManyQuery.ModelMixin, {

  name: DS.attr('string'),
  startDate: DS.attr('date'),
  endDate: DS.attr('date'),
  positionQuote: DS.attr('number'),

  categories: DS.hasMany({ async: true }),
  models: DS.hasMany({ async: true }),
  submodels: DS.hasMany({ async: true }),

  slug: computed('name', function () {
    return this.get('name').dasherize();
  }),

  logoURL: computed('slug', function () {
    return `https://assets.largus.fr/logos/marques/${this.get('slug')}.png`;
  }),
});
