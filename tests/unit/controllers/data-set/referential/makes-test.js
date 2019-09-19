import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';
import EmberObject from '@ember/object';

describe('Unit | Controller | data-set/referential/makes', function() {
  setupTest();

  describe('Computed filteredCategories', function() {
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
              showCategory: testCase.condition[0]
            }),
            EmberObject.create({
              name: "category2",
              showCategory: testCase.condition[1]
            }),
          ],
        });
        let controller = this.owner.lookup('controller:data-set/referential/makes');
        controller.set('model', modelTest);

        expect(controller.get('filteredCategories').mapBy('name')).to.members(testCase.result);
      })
    })
  });
});
