import DS from 'ember-data';
import HasManyQuery from 'ember-data-has-many-query';
import DisplayDateMixin from '../mixins/display-date';
import SortableDate from '../mixins/sortable-date';


export default DS.Model.extend(DisplayDateMixin, SortableDate, HasManyQuery.ModelMixin, {
  priceExcludingVat: DS.attr('number'),
  priceIncludingVat: DS.attr('number'),
  startDate: DS.attr('date'),
  startDateType: DS.attr('string'),
  endDate: DS.attr('date'),
  endDateType: DS.attr('string'),
  manufacturerSpec1: DS.attr('string'),
  manufacturerSpec2: DS.attr('string'),
  manufacturerSpec3: DS.attr('string'),

  version: DS.belongsTo({ async: true }),
  phase: DS.belongsTo({ async: true }),
  generation: DS.belongsTo({ async: true }),
  submodel: DS.belongsTo({ async: true }),
  model: DS.belongsTo({ async: true }),
  make: DS.belongsTo({ async: true }),
  features: DS.hasMany({ async: true }),
  standardFeatures: DS.hasMany({ async: true }),
  optionalFeatures: DS.hasMany({ async: true }),
  equipments: DS.hasMany({ async: true }),
  standardEquipments: DS.hasMany({ async: true }),
  optionalEquipments: DS.hasMany({ async: true }),
  packs: DS.hasMany({ async: true }),
  standardPacks: DS.hasMany({ async: true }),
  optionalPacks: DS.hasMany({ async: true }),
  weight: DS.belongsTo({ async: true }),
  tyre: DS.belongsTo({ async: true }),
  transmission: DS.belongsTo({ async: true }),
  platform: DS.belongsTo({ async: true }),
  performance: DS.belongsTo({ async: true }),
  consumption: DS.belongsTo({ async: true }),
  dimension: DS.belongsTo({ async: true }),
  boot: DS.belongsTo({ async: true }),
  engine: DS.belongsTo({ async: true }),
});
