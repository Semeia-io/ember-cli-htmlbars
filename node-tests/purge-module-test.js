'use strict';

const _purgeModule = require('../ember-addon-main').purgeModule;
const expect = require('chai').expect;

describe('purgeModule', function() {
  const FIXTURE_COMPILER_PATH = require.resolve('./fixtures/compiler');

  function purgeModule(modulePath) {
    return _purgeModule.call({}, modulePath);
  }

  it('it works correctly', function() {
    expect(purgeModule('asdfasdfasdfaf-unknown-file')).to.eql(undefined);

    expect(require.cache[FIXTURE_COMPILER_PATH]).to.eql(undefined);

    require(FIXTURE_COMPILER_PATH);

    const mod = require.cache[FIXTURE_COMPILER_PATH];

    expect(mod.parent).to.eql(module);
    expect(mod.parent.children).to.include(mod);

    purgeModule(FIXTURE_COMPILER_PATH);

    expect(require.cache[FIXTURE_COMPILER_PATH]).to.eql(undefined);
    expect(mod.parent.children).to.not.include(mod);

    require(FIXTURE_COMPILER_PATH);

    const freshModule = require.cache[FIXTURE_COMPILER_PATH];

    expect(freshModule.parent).to.eql(module);
    expect(freshModule.parent.children).to.include(freshModule);

    purgeModule(FIXTURE_COMPILER_PATH);

    expect(require.cache[FIXTURE_COMPILER_PATH]).to.eql(undefined);
    expect(freshModule.parent.children).to.not.include(mod);
  });
});
