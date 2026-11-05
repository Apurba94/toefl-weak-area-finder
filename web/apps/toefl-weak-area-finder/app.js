/* TOEFL Weak Area Finder: a short diagnostic plus your results across the suite, to show what to study next. */
(function () {
  'use strict';
  const APP_FOR = { Reading: 'toefl-academic-reading', 'Complete the Words': 'toefl-complete-the-words', Listening: 'toefl-choose-response', 'Build a Sentence': 'toefl-build-sentence', Grammar: 'toefl-grammar-drill' };
  const diagnostic = (data, seed) => {
    const r = SK.rng(seed);
    const tag = (items, topic) => items.map((x) => Object.assign(x, { topic }));
    const p = SK.pick(r, data.toefl_passages), c = SK.cTest(p.text, 8);
    return tag([{ id: 'd-ctw-' + p.id, type: 'gaps', stem: 'Fill in the missing letters.', parts: c.parts, answer: c.answer }], 'Complete the Words')
      .concat(tag(SK.takeGroups(r, SK.passageItems(data.toefl_passages), 3).slice(0, 3), 'Reading'),
        tag(SK.sample(r, data.responses, 4).map((x) => SK.shuffleItem(r, { id: 'd-cr-' + x.id, type: 'single', stem: 'Choose the best response.', audio: { title: 'Speaker', text: x.say }, choices: x.choices, answer: x.answer })), 'Listening'),
        tag(SK.sample(r, data.build_sentences, 3).map((x) => SK.shuffleItem(r, { id: 'd-bs-' + x.id, type: 'order', stem: 'Put the words in order.', frame: x.context, answer: x.s.split(' ') })), 'Build a Sentence'),
        tag(SK.fromBank(r, data.grammar, 'All', 4), 'Grammar'));
  };
  const App = {
    about: 'Fifteen items across reading, Complete the Words, listening, Build a Sentence and grammar, combined with your results in every other TOEFL app, show your weakest skills, with a link to the app that trains each.',
    how: ['Turn on sound and press **Start the diagnostic**. It takes about 15 minutes.', 'Read the **Report**, which grows more reliable as you practise in other apps.'],
    tabs: [
      { id: 'diag', label: 'Diagnostic', render(el, ctx) { el.appendChild(SK.card('TOEFL diagnostic', SK.btn('Start the diagnostic', () => SK.quiz(el, diagnostic(ctx.data, SK.seedNow()), { title: 'TOEFL diagnostic', mode: 'test', seconds: 15 * 60 }), '', { 'data-auto': 'once' }))); } },
      { id: 'report', label: 'Report', render(el) {
        const weak = SK.weakAreas(SK.store.get('suite.sessions', []).filter((s) => s.exam === 'TOEFL').map((s) => Object.assign({}, s, { exam: '' })), 2);
        el.appendChild(SK.card('Your weak areas', weak.length ? SK.table(['Area', 'Answers', 'Accuracy', 'Train with'], weak.slice(0, 10).map((w) => [w.topic.trim(), w.total, w.pct + '%', APP_FOR[w.topic.trim()] ? SK.appLink(APP_FOR[w.topic.trim()], APP_FOR[w.topic.trim()]) : ''])) : SK.h('p', { class: 'sk-muted', text: 'Take the diagnostic or practise in other TOEFL apps to see a report.' })));
      } },
    ],
    diagnostic,
    checks: { 'the diagnostic covers five areas and is valid': (data, assert) => {
      for (let s = 1; s < 15; s++) { const d = diagnostic(data, s); assert.equal(d.length, 15); assert.equal(new Set(d.map((x) => x.topic)).size, 5); for (const it of d) assert.deepEqual(SK.validateItem(it), []); }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
