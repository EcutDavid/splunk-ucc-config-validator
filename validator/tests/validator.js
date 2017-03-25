import assert from 'assert';
import validator from '../src';
import configWithoutError from './testCases/configWithoutError.json';
import configWithError from './testCases/configWithError.json';

describe('Validator testes', () => {
  it('Configuration without error should has no error', () => {
    const result = validator.validate(configWithoutError);
    assert.equal(0, result.errors.length);
  });

  it('Support transformIndex option', () => {
    const result = validator.validate(configWithError, { transformIndex: true });
    assert.equal(1, result.errors.length);
    const expectedProperty = 'instantce.pages.configuration.tabs("account").entity("name").validators[0]';
    assert.equal(result.errors[0].property, expectedProperty);
  });
});
