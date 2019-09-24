import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';
import EmberObject from '@ember/object';

describe('Unit | Controller | data-set/referential/makes', function() {
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
        });
        let controller = this.owner.lookup('controller:data-set/referential/makes');
        controller.set('model', modelTest);

        expect(controller.get('selectedCategories').mapBy('name')).to.members(testCase.result);
      })
    })
  });

  describe('Function | _checkMakeCategories', function() {
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
        const make = EmberObject.create({
          categories: new Promise(function (resolve) {
            const makeCategories = [
              category2,
            ]
            resolve(makeCategories);
          }),
        });

        let controller = this.owner.lookup('controller:data-set/referential/makes');

        const isCategoryMatching = await controller._checkMakeCategories(make, testCase.selectedCategories);
        expect(isCategoryMatching).to.equal(testCase.result);
      });
    });
  });

  describe('Function | _filterMakeBySearchTerm', function() {
    const testCases = [
      {
        message: 'No matching term',
        searchTerm: 'Azerty',
        result: [],
      },
      {
        message: 'Matching term',
        searchTerm: 'Rena',
        result: ['renault'],
      },
    ];
    testCases.forEach((testCase) => {
      it(testCase.message, function(){
        const makes = [
          EmberObject.create({
            name: 'peugeot',
          }),
          EmberObject.create({
            name: 'renault',
          }),
        ];
        let controller = this.owner.lookup('controller:data-set/referential/makes');
        const searchTermMatch = controller._filterMakeBySearchTerm(makes, testCase.searchTerm);

        expect(searchTermMatch.mapBy('name')).to.members(testCase.result);
      })
    });
  });
});
