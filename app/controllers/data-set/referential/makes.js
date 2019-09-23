import Controller from '@ember/controller';
import DS from 'ember-data';
import { computed } from '@ember/object';
import { filter } from 'rsvp';

export default Controller.extend({
  queryParams: ['searchTerm'],
  searchTerm: '',

  selectedCategories: computed('model.categories.@each.isSelected', function () {
    const categories = this.get('model.categories');
    if (categories.isAny('isSelected')) { return categories.filterBy('isSelected'); }

    return categories;
  }),

  filteredMakesByCategories: computed('selectedCategories', 'model.makes', function () {
    const makes = this.get('model.makes').toArray();
    const selectedCategories = this.get('selectedCategories');
    return DS.PromiseArray.create({
      promise: filter(makes, (make) => this._checkMakeCategories(make, selectedCategories)),
    });
  }),

  async _checkMakeCategories(make, selectedCategories) {
    let makeCategories;
    try {
      makeCategories = await make.get('categories');
    } catch (e) {
      throw e;
    }
    return makeCategories.reduce((previousValue, makeCategory) => {
      const makeCategoryName = makeCategory.get('name');
      if (previousValue) { return true; }
      if (selectedCategories.isAny('name', makeCategoryName)) { return true; }
      return false;
    }, false);
  },

  filteredMakes: computed('filteredMakesByCategories.content', 'searchTerm', function () {
    const makes = this.get('filteredMakesByCategories.content');
    if (!makes) {
      return [];
    }
    const searchTerm = this.get('searchTerm');
    const filteredMakes = makes.filter((make) => (make.get('name').toLowerCase().indexOf(searchTerm) > -1));
    return filteredMakes;
  }),

});
