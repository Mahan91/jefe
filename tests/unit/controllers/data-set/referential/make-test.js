import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';
import EmberObject from '@ember/object';

describe.only('Unit | Controller | data-set/referential/make', function() {
  setupTest();

  describe('Computed | selectedCategories', function() {
    const testCases = [
      {
        message: 'No categories selected',
        condition: [false, false],
        result: ['category1', 'category2'],
      },
      {
        message: 'One category selected',
        condition: [true, false],
        result: ['category1'],
      },
      {
        message: 'All categories selected',
        condition: [true, true],
        result: ['category1', 'category2'],
      },
    ];

    testCases.forEach((testCase) => {
      it(testCase.message, function() {
        const modelTest = EmberObject.create({
          make: {
            categories: [
              EmberObject.create({
                name: "category1",
                isSelected: testCase.condition[0]
              }),
              EmberObject.create({
                name: "category2",
                isSelected: testCase.condition[1]
              }),
            ],
          },
        });
        let controller = this.owner.lookup('controller:data-set/referential/make');
        controller.set('model', modelTest);

        expect(controller.get('selectedCategories').mapBy('name')).to.members(testCase.result);
      })
    })
  });

  describe('Function | _filterByProductionEndDate', function() {
    const testCases = [
      {
        message: 'productionFilter Disable',
        productionFilter: false,
        model: EmberObject.create({
          endDate: '1999-12-12',
        }),
        result: false,
      },
      {
        message: 'productionFilter Enable, model with EndDate',
        productionFilter: true,
        model: EmberObject.create({
          endDate: '1999-12-12',
        }),
        result: true,
      },
      {
        message: 'productionFilter Enable, model without EndDate',
        productionFilter: true,
        model: EmberObject.create({
          endDate: null,
        }),
        result: false,
      },
    ];
    testCases.forEach((testCase) => {
      it(testCase.message, function() {
        let controller = this.owner.lookup('controller:data-set/referential/make');
        const filterModel = controller._filterByProductionEndDate(testCase.model, testCase.productionFilter);

        expect(filterModel).to.equal(testCase.result);
      });
    });
  });

  describe('Function | _checkModelCategories', function() {
    const category1 = EmberObject.create({
      name: 'category1'
    });
    const category2 = EmberObject.create({
      name: 'category2'
    });

    const testCases = [
      {
        message: 'No category match',
        selectedCategories: [
          category1,
        ],
        result: false,
      },
      {
        message: 'Category match',
        selectedCategories: [
          category1,
          category2,
        ],
        result: true,
      }
    ];
    testCases.forEach((testCase) => {
      it(testCase.message, async function() {
        const model = EmberObject.create({
          categories: new Promise(function (resolve) {
            const modelCategories = [
              category2,
            ]
            resolve(modelCategories);
          }),
        });

        let controller = this.owner.lookup('controller:data-set/referential/make');

        const isCategoryMatching = await controller._checkModelCategories(model, testCase.selectedCategories);
        expect(isCategoryMatching).to.equal(testCase.result);
      });
    });
  });

  describe('Function | _checkSubmodelCategory', function() {
    const category1 = EmberObject.create({
      name: 'category1'
    });
    const category2 = EmberObject.create({
      name: 'category2'
    });

    const testCases = [
      {
        message: 'No category match',
        selectedCategories: [
          category1,
        ],
        result: false,
      },
      {
        message: 'Category match',
        selectedCategories: [
          category1,
          category2,
        ],
        result: true,
      }
    ];
    testCases.forEach((testCase) => {
      it(testCase.message, async function() {
        const submodel = EmberObject.create({
          category: new Promise(function (resolve) {
            const submodelCategory = category2;
            resolve(submodelCategory);
          }),
        });

        let controller = this.owner.lookup('controller:data-set/referential/make');

        const isCategoryMatching = await controller._checkSubmodelCategory(submodel, testCase.selectedCategories);
        expect(isCategoryMatching).to.equal(testCase.result);
      });
    });
  });
});
