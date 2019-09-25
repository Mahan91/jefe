import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';
import { filter } from 'rsvp';
import DS from 'ember-data';
import { inject as service } from '@ember/service';

export default Controller.extend({
  localizedReferentials: service(),

  categoriesSorting: Object.freeze(['name', 'asc']),
  sortedCategories: sort('model.make.categories', 'categoriesSorting'),

  selectedCategories: computed('model.make.categories.@each.isSelected', function () {
    const categories = this.get('model.make.categories');
    if (categories.isAny('isSelected')) { return categories.filterBy('isSelected'); }

    return categories;
  }),

  productionFilter: false,

  filteredModels: computed('selectedCategories', 'model.make.models.category', 'productionFilter', function () {
    const makeModels = this.get('model.make.models');
    const selectedCategories = this.get('selectedCategories');
    const productionFilter = this.get('productionFilter');

    return DS.PromiseArray.create({
      promise: filter(makeModels.toArray(), (makeModel) => {
        if (this._filterByProductionEndDate(makeModel, productionFilter)) { return false; }
        return this._checkModelCategories(makeModel, selectedCategories);
      }),
    });
  }),

  filteredSubmodels: computed('selectedCategories', 'model.make.submodels.category', 'productionFilter', function () {
    const makeSubmodels = this.get('model.make.submodels');
    const selectedCategories = this.get('selectedCategories');
    const productionFilter = this.get('productionFilter');

    return DS.PromiseArray.create({
      promise: filter(makeSubmodels.toArray(), (makeSubmodel) => {
        if (this._filterByProductionEndDate(makeSubmodel, productionFilter)) { return false; }
        return this._checkSubmodelCategory(makeSubmodel, selectedCategories);
      }),
    });
  }),

  _filterByProductionEndDate(model, productionFilter) {
    if(productionFilter && model.get('endDate')) { return true; }
    return false;
  },

  async _checkModelCategories(model, selectedCategories) {
    let modelCategories;
    try {
      modelCategories = await model.get('categories');
    } catch (e) {
      throw e;
    }

    return modelCategories.reduce((previousValue, modelCategory) => {
      const modelCategoryName = modelCategory.get('name');
      if (previousValue) { return true; }
      if (selectedCategories.isAny('name', modelCategoryName)) { return true; }

      return false;
    }, false);
  },

  async _checkSubmodelCategory(model, selectedCategories) {
    let submodelCategory;
    try {
      submodelCategory = await model.get('category');
    } catch (e) {
      throw e;
    }

    const submodelCategoryName = submodelCategory.get('name');
    return selectedCategories.isAny('name', submodelCategoryName);
  },

  // Models sorting
  sortProperty: 'name',
  sortOrder: 'asc',

  modelsSorting: computed('sortProperty', 'sortOrder', function () {
    const sortProperty = this.get('sortProperty');
    const sortOrder = this.get('sortOrder');
    return [`${sortProperty}:${sortOrder}`, `id:${sortOrder}`];
  }),
  sortedModels: sort('filteredModels.content', 'modelsSorting'),
});
