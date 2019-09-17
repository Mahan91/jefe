import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

module('Unit | Controller | data-set/referential/vehicle', function(hooks) {
  setupTest(hooks);

  test('updateSelectedPeriod | selectedPeriod Initialization', function(assert) {
    let controller = this.owner.lookup('controller:data-set/referential/vehicle');

    assert.equal(controller.get('selectedPeriod'), null, 'selectedPeriod updated');
  });

  test('updateSelectedPeriod | selectedPeriod Update', function(assert) {
    const testPeriod = EmberObject.create({
      id: 0
    });
    let controller = this.owner.lookup('controller:data-set/referential/vehicle');

    controller.send('updateSelectedPeriod', testPeriod);

    assert.equal(controller.get('selectedPeriod'), testPeriod, 'selectedPeriod updated');
  });



  test('updateSelectedPeriod | periodId Initialization', function(assert) {
    let controller = this.owner.lookup('controller:data-set/referential/vehicle');

    assert.equal(controller.get('periodId'), null, 'selectedPeriod updated');
  });

  test('updateSelectedPeriod | periodId update', function(assert) {
    const testPeriod = EmberObject.create({
      id: 0
    });
    let controller = this.owner.lookup('controller:data-set/referential/vehicle');

    controller.send('updateSelectedPeriod', testPeriod);

    assert.equal(controller.get('periodId'), 0, 'periodId updated');
  });

});
