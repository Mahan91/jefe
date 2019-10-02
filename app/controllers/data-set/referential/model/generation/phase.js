import Controller from '@ember/controller';
import { computed } from '@ember/object'; // eslint-disable-line import/no-duplicates
import EmberObject from '@ember/object'; // eslint-disable-line import/no-duplicates
import ArrayProxy from '@ember/array/proxy';

export default Controller.extend({

  queryParams: Object.freeze([
    'engines',
    'energies',
    'trimLevels',
    'gearboxes',
    'transmissions',
    'sortBy',
    'sortOrder',
  ]),

  init() {
    this._super(...arguments);
    const queryParams = this.get('queryParams');
    this.set('sortOrder', this.get('sortOrder') ? this.get('sortOrder') : 'asc');
    queryParams.forEach((queryParam) => {
      if (!this.get(queryParam)) {
        this.set(queryParam, []);
      }
    });
  },

  actions: {
    toggleEnergy(energyOption) {
      const engineOptions = energyOption.get('engineOptions');
      if (!engineOptions) {
        this.send('toggleFilter', energyOption, 'energies');
        return;
      }
      const enginesIds = engineOptions.mapBy('id');
      const queryParam = this.get('engines');
      queryParam.removeObjects(enginesIds);
      if (!energyOption.isActive) {
        engineOptions.setEach('isActive', true);
        queryParam.pushObjects(enginesIds);
      } else {
        engineOptions.setEach('isActive', false);
      }
    },
    toggleFilter(filterOption, queryParam) {
      filterOption.toggleProperty('isActive');
      if (filterOption.get('isActive')) {
        this.get(queryParam).pushObject(filterOption.get('id'));
      } else {
        this.get(queryParam).removeObject(filterOption.get('id'));
      }
    },
  },

  trimLevelOptions: computed('model.trimLevels', function () {
    const trimLevels = this.get('model.trimLevels') || [];
    return this._generateFilterOptions(trimLevels, ['name'], [], 'trimLevels');
  }),
  engineOptions: computed('model.engines', function () {
    const engines = this.get('model.engines') || [];
    return this._generateFilterOptions(engines, ['marketName', 'standardEmission'], ['dinHorsepower', 'saeHorsepower'], 'engines');
  }),
  energyOptions: computed('model.energies', 'engineOptions', function () {
    const energies = this.get('model.energies') || [];
    return this._generateFilterOptions(energies, ['name'], [], 'energies');
  }),
  gearboxOptions: computed('model.gearboxes', function () {
    const gearboxes = this.get('model.gearboxes') || [];
    return this._generateFilterOptions(gearboxes, ['name'], ['subtype', 'numberOfGears'], 'gearboxes');
  }),
  transmissionOptions: computed('model.transmissions', function () {
    const transmissions = this.get('model.transmissions') || [];
    return this._generateFilterOptions(transmissions, ['drivenWheels', 'marketingName'], [], 'transmissions');
  }),

  _generateFilterOptions(
    filtersRecordsArray,
    primaryNamingProperties,
    secondaryNamingProperties,
    queryParamName,
  ) {
    return filtersRecordsArray.map((filterRecord) => {
      const filterRecordType = filterRecord.get('constructor.modelName');
      const filterRecordId = filterRecord.get('id');

      const filter = EmberObject.extend({
        id: filterRecordId,
        name: this._selectFilterName(
          filterRecord,
          primaryNamingProperties,
          secondaryNamingProperties,
        ),
        inputId: `${filterRecordType}-${filterRecordId}`,
        isActive: this.get(queryParamName).isAny(filterRecordId),
      });

      if (filterRecordType === 'engine') { return this._linkEngineToEnergy(filter, filterRecord).create(); }
      if (filterRecordType === 'energy') { return this._linkEnergyToEngines(filter, filterRecord).create(); }

      return filter.create();
    }).sortBy('name');
  },

  _selectFilterName(filterRecord, primaryNamingProperties, secondaryNamingProperties) {
    const filterName = this._generateFilterName(filterRecord, primaryNamingProperties);
    if (filterName) { return filterName; }
    return this._generateFilterName(filterRecord, secondaryNamingProperties);
  },

  _generateFilterName(filterRecord, namingProperties) {
    return namingProperties.reduce((filterName, namingProperty) => {
      const namingPropertyValue = filterRecord.get(namingProperty);

      if (!namingPropertyValue) { return filterName; }
      if (filterName === '') { return namingPropertyValue; }

      return `${filterName} - ${namingPropertyValue}`;
    }, '');
  },

  _linkEngineToEnergy(engineFilter, engineRecord) {
    return engineFilter.extend({
      energyId: engineRecord.belongsTo('energy').id(),
    });
  },

  _linkEnergyToEngines(energyFilter, energyRecord) {
    const engineOptions = this.get('engineOptions');
    return energyFilter.extend({
      isActive: computed('engineOptions.@each.isActive', function () {
        return this.get('engineOptions').isEvery('isActive', true);
      }),
      isIndeterminate: computed('engineOptions.@each.isActive', 'isActive', function () {
        const isActive = this.get('isActive');
        if (isActive) {
          return false;
        }
        return this.get('engineOptions').isAny('isActive', true);
      }),
      engineOptions: ArrayProxy.create({
        content: engineOptions.filter((engineOption) => engineOption.get('energyId') === energyRecord.get('id')),
      }),
    });
  },

  filteredVersion: computed(
    'model.versions',
    'trimLevelOptions.@each.isActive',
    'gearboxOptions.@each.isActive',
    'transmissionOptions.@each.isActive',
    'engineOptions.@each.isActive',
    'energyOptions.@each.isActive',
    function () {
      const versionsArray = this.get('model.versions') || [];
      const filters = [
        {
          filteredProp: 'trimLevel',
          activesFilters: this.get('trimLevelOptions').filterBy('isActive', true),
          isBelongTo: false,
        },
        {
          filteredProp: 'gearbox',
          activesFilters: this.get('gearboxOptions').filterBy('isActive', true),
          isBelongTo: true,
        },
        {
          filteredProp: 'lastTransmission.content.id',
          activesFilters: this.get('transmissionOptions').filterBy('isActive', true),
          isBelongTo: false,
        },
      ];
      if (this.get('engineOptions.length')) {
        filters.pushObject({
          filteredProp: 'lastEngine.content.id',
          activesFilters: this.get('engineOptions').filterBy('isActive', true),
          isBelongTo: false,
        });
      } else {
        filters.pushObject({
          filteredProp: 'energy',
          activesFilters: this.get('energyOptions').filterBy('isActive', true),
          isBelongTo: true,
        });
      }
      return versionsArray.filter((version) => this._filterVersion(version, filters));
    },
  ),

  _filterVersion(version, filters) {
    if (filters.isEvery('activesFilters.length', 0)) { return true; }

    return filters.reduce((previousValue, filter) => {
      if (!previousValue) { return false; }
      if (filter.activesFilters.length === 0) { return true; }
      if (filter.isBelongTo) { return filter.activesFilters.isAny('id', version.belongsTo(filter.filteredProp).id()); }

      return filter.activesFilters.isAny('id', version.get(filter.filteredProp));
    }, true);
  },
});
