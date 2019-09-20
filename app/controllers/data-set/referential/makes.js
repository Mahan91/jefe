import Controller from '@ember/controller';
import DS from 'ember-data';
import { computed } from '@ember/object';
import { filter } from 'rsvp';

export default Controller.extend({
  queryParams: ['searchTerm'],
  searchTerm: '',

  filteredCategories: computed('model.categories.@each.isSelected', function () {
    const categories = this.get('model.categories');
    if (categories.isAny('isSelected')) { return categories.filterBy('isSelected'); }

    return categories;
  }),

  filteredMakesByCategory: computed('filteredCategories', 'model.makes', function () {
    const makes = this.get('model.makes');
    const filteredCategories = this.get('filteredCategories');
    return DS.PromiseArray.create({
      promise: filter(makes.toArray(), (make) => {
        // Create Function
        const promise = make.get('categories').then((makeCategories) => {
          let makeIsDisplayed = false;
          makeCategories.forEach((makeCategory) => {
            const makeCategoryName = makeCategory.get('name');
            if (filteredCategories.isAny('name', makeCategoryName)) {
              makeIsDisplayed = true;
            }
          });
          return makeIsDisplayed;
        });
        return promise;
      }),
    });
  }),

  filteredMakes: computed('filteredMakesByCategory.content', 'searchTerm', function () {
    const makes = this.get('filteredMakesByCategory.content');
    if (!makes) {
      return [];
    }
    const searchTerm = this.get('searchTerm');
    const filteredMakes = makes.filter((make) => (make.get('name').toLowerCase().indexOf(searchTerm) > -1));
    return filteredMakes;
  }),

});
