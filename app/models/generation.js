import DS from 'ember-data';
import { sort } from '@ember/object/computed';
import HasManyQuery from 'ember-data-has-many-query';

export default DS.Model.extend(HasManyQuery.ModelMixin, {
  name: DS.attr('string'),
  shortNicename: DS.attr('string'),
  fullNicename: DS.attr('string'),
  startDate: DS.attr('date'),
  endDate: DS.attr('date'),
  bodyType: DS.attr('string'),
  legacyId: DS.attr('number'),
  bodyTypeClassifiedAd: DS.attr('string'),
  position: DS.attr('number'),
  segment: DS.attr('string'),
  segmentReferentiel: DS.attr('string'),
  segmentEurope: DS.attr('string'),

  make: DS.belongsTo({ async: true }),
  model: DS.belongsTo({ async: true }),
  submodel: DS.belongsTo({ async: true }),
  phases: DS.hasMany({ async: true }),


  // Computed properties

  phaseSorting: Object.freeze(['startDate:desc']),
  sortedPhases: sort('phases', 'phaseSorting'),

});
