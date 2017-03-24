import assert from 'assert';
import validator from '../src';
import configWithoutError from './testCases/configWithoutError.json';

describe('Validator testes', function() {
  it('configuration without error should has no error', function() {
    const result = validator.validate(configWithoutError);
    assert.equal(0, result.errors.length);
  });
});
