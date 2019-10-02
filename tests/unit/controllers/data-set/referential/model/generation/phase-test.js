import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe.only('Unit | Controller | data-set/referential/model/generation/phase', function() {
  setupTest();

  // Replace this with your real tests.
  it('exists', function() {
    let controller = this.owner.lookup('controller:data-set/referential/model/generation/phase');
    expect(controller).to.be.ok;
  });
});
