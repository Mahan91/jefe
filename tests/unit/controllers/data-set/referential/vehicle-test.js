import { expect } from 'chai';
import { describe, it, done } from 'mocha';
import { setupTest } from 'ember-mocha';
import EmberObject from '@ember/object';

describe('Unit | Controller | data-set/referential/vehicle', function() {
  setupTest();

  describe('updateSelectedPeriod', function() {
    describe('selectedPeriod', function() {
      it('Initialization', function() {
        let controller = this.owner.lookup('controller:data-set/referential/vehicle');
        expect(controller.get('selectedPeriod')).to.equal(null);
      });

      it('Update', function() {
        const testPeriod = EmberObject.create({
          id: 0
        });
        let controller = this.owner.lookup('controller:data-set/referential/vehicle');

        controller.send('updateSelectedPeriod', testPeriod);

        expect(controller.get('selectedPeriod')).to.equal(testPeriod);
      })
    });

    describe('updatePeriodId', function() {
      it('Initialization', function() {
        let controller = this.owner.lookup('controller:data-set/referential/vehicle');
        expect(controller.get('periodId')).to.equal(null);
      });

      it('Update', function() {
        const testPeriod = EmberObject.create({
          id: 0
        });
        let controller = this.owner.lookup('controller:data-set/referential/vehicle');

        controller.send('updateSelectedPeriod', testPeriod);
        expect(controller.get('periodId')).to.equal(testPeriod.get('id'));

      });
    });
  });
});
