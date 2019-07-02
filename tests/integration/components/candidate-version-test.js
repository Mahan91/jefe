import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupIntl } from 'ember-intl/test-support';


module('Integration | Component | candidate-version', function(hooks) {
  // Setup Locale
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en');

  // Provide data to the store

  let version = {
    name: "Cooper 136ch Pack Red Hot Chili BVA",
    quoteRatio: .8,
    make: {
      name: "MINI",
      logoURL: 'https://assets.largus.fr/logos/marques/mini.png'
    },
    submodel: {
      name: "Mini",
    },
    generation: {
      name: "III (F56)",
    },
    phase: {
      name: "1"
    },
  };
  const aggregatedCandidateQuoteRatio = 1;
  let candidate = {
    suggested: false
  };
  let isSelectable = false;

  test('it renders', async function (assert) {
    this.set('version', version);
    this.set('aggregatedCandidateQuoteRatio', aggregatedCandidateQuoteRatio);
    this.set('candidate', candidate);
    this.set('isSelectable', isSelectable)
    await render(hbs`{{candidate-version version=version candidate=candidate aggregatedCandidateQuoteRatio=aggregatedCandidateQuoteRatio isSelectable=isSelectable}}`);

    // Testing text display
    assert.equal(this.element.querySelector('.infos h5').textContent.trim(), 'MINI - Mini', 'Make - Submodel display');
    assert.equal(this.element.querySelector('.infos p.m--margin-bottom-5').textContent.trim(), 'Gen. III (F56) Pe. 1', 'Generation - Phase display');
    assert.equal(this.element.querySelector('.infos p.m--marginless').textContent.trim(), 'Cooper 136ch Pack Red Hot Chili BVA', 'Version display');

    // Testing Gauge Behaviour
    assert.equal(this.element.querySelector('.candidate-frequency__gauge').getAttribute('style'), 'height: 80%', 'Gauge filling at 0.8');
    assert.equal(this.element.querySelector('.candidate-frequency__gauge').getAttribute('class'), 'candidate-frequency__gauge m--bg-success', 'Gauge color at 0.8');

    this.set('version.quoteRatio', .42);
    assert.equal(this.element.querySelector('.candidate-frequency__gauge').getAttribute('style'), 'height: 42%', 'Gauge filling at 0.42');
    assert.equal(this.element.querySelector('.candidate-frequency__gauge').getAttribute('class'), 'candidate-frequency__gauge m--bg-warning', 'Gauge color at 0.42');

    this.set('version.quoteRatio', .16);
    assert.equal(this.element.querySelector('.candidate-frequency__gauge').getAttribute('style'), 'height: 16%', 'Gauge filling at 0.42');
    assert.equal(this.element.querySelector('.candidate-frequency__gauge').getAttribute('class'), 'candidate-frequency__gauge m--bg-danger', 'Gauge color at 0.16');

    // Test select interraction
    this.set('isSelectable', true);
    assert.equal(this.element.querySelector('.list-item-content').getAttribute('class'), 'list-item-content is-selectable ember-view', 'Is selectable');

    await click('.list-item-content');
    assert.equal(this.element.querySelector('.list-item-content').getAttribute('class'), 'list-item-content is-selected is-selectable ember-view', 'Select element');

  });





});
