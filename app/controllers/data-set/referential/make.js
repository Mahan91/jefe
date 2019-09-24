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
    const productionFilter = this.get('productionFilter');
    const selectedCategories = this.get('selectedCategories');

    return DS.PromiseArray.create({
      promise: filter(makeModels.toArray(), (makeModel) => {
        const isInProduction = !makeModel.get('endDate');
        const promise = makeModel.get('categories').then((modelCategories) => {
          let modelIsDisplayed = false;
          if (!productionFilter || (productionFilter && isInProduction)) {
            modelCategories.forEach((modelCategory) => {
              const modelCategoryName = modelCategory.get('name');
              if (selectedCategories.isAny('name', modelCategoryName)) {
                modelIsDisplayed = true;
              }
            });
          }
          return modelIsDisplayed;
        });
        return promise;
      }),
    });
  }),

  filteredSubmodels: computed('selectedCategories', 'model.make.submodels.category', 'productionFilter', function () {
    const makeSubmodels = this.get('model.make.submodels');
    const productionFilter = this.get('productionFilter');
    const selectedCategories = this.get('selectedCategories');

    return DS.PromiseArray.create({
      promise: filter(makeSubmodels.toArray(), (makeSubmodel) => {
        const isInProduction = !makeSubmodel.get('endDate');
        const promise = makeSubmodel.get('category').then((submodelCategory) => {
          if (!productionFilter || (productionFilter && isInProduction)) {
            const submodelCategoryName = submodelCategory.get('name');
            return selectedCategories.isAny('name', submodelCategoryName);
          }
          return false;
        });
        return promise;
      }),
    });
  }),

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
