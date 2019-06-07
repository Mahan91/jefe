import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupIntl } from 'ember-intl/test-support';
import Ember from 'ember';


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

  test('it renders', async function (assert) {
    this.set('version', version);
    this.set('aggregatedCandidateQuoteRatio', aggregatedCandidateQuoteRatio);
    this.set('candidate', candidate);
    await render(hbs`{{candidate-version version=version candidate=candidate aggregatedCandidateQuoteRatio=aggregatedCandidateQuoteRatio}}`);


    assert.equal(this.element.querySelector('.infos h5').textContent.trim(), 'MINI - Mini', 'Make - Submodel display');
    assert.equal(this.element.querySelector('.infos p').textContent.trim(), 'Gen. III (F56) Pe. 1', 'Generation - Phase display');


    // Template block usage:
    // await render(hbs`
    //   {{#candidate-version}}
    //     template block text
    //   {{/candidate-version}}
    // `);

    // assert.equal(this.element.textContent.trim(), 'template block text');
  });





});
