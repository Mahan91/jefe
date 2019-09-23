import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';
import EmberObject from '@ember/object';

describe.only('Unit | Controller | data-set/referential/makes', function() {
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

  describe('Computed | filteredMakesByCategories', function() {
    it('Computed | filteredMakesByCategory', async function() {
      const category1 = EmberObject.create({
        name: 'category1'
      });
      const category2 = EmberObject.create({
        name: 'category2'
      });
      const categories = [
        category1,
        category2,
      ];
      const filteredCategories = [
        category2,
      ];
      const modelTest = EmberObject.create({
        makes: [
          EmberObject.create({
            name: "make1",
            categories: new Promise(function (resolve) {
              const makeCategories = [
                category1,
                category2
              ]
              resolve(makeCategories);
            }),
          }),
          EmberObject.create({
            name: "make2",
            categories: new Promise(function (resolve) {
              const makeCategories = [
                category1,
              ]
              resolve(makeCategories);
            }),
          }),
        ],
      });
      const makesNameExpectResult = ['make1'];

      let controller = this.owner.lookup('controller:data-set/referential/makes');
      controller.set('model', modelTest);
      controller.set('selectedCategories', filteredCategories);

      const filteredMakesByCategory = await controller.get('filteredMakesByCategories');
      expect(filteredMakesByCategory.mapBy('name')).to.members(makesNameExpectResult);

    });
  });
});
