import assert from 'assert';
import indexToName from '../src/indexToName';
import configWithoutError from './testCases/configWithoutError.json';

describe('Transform index to it\s identity', () => {
  it('Test case 1', () => {
    const path = 'instantce.pages.configuration.tabs[0].entity[0].validators[0]';

    const transformResult = indexToName(configWithoutError, path);

    const tabName = configWithoutError.pages.configuration.tabs[0].name;
    const entityFieldName = configWithoutError.pages.configuration.tabs[0].entity[0].field;
    const expectedResult = `instantce.pages.configuration.tabs("${tabName}").entity("${entityFieldName}").validators[0]`;

    assert.equal(transformResult, expectedResult);
  });

  it('Test case 2', () => {
    const path = 'instantce.pages.configuration.tabs[1].entity[0]';

    const transformResult = indexToName(configWithoutError, path);

    const tabName = configWithoutError.pages.configuration.tabs[1].name;
    const entityFieldName = configWithoutError.pages.configuration.tabs[1].entity[0].field;
    const expectedResult = `instantce.pages.configuration.tabs("${tabName}").entity("${entityFieldName}")`;

    assert.equal(transformResult, expectedResult);
  });

  it('Test case 3', () => {
    const path = 'instantce.pages.configuration.tabs[2].entity[0]';

    const transformResult = indexToName(configWithoutError, path);

    const tabName = configWithoutError.pages.configuration.tabs[2].name;
    const entityFieldName = configWithoutError.pages.configuration.tabs[2].entity[0].field;
    const expectedResult = `instantce.pages.configuration.tabs("${tabName}").entity("${entityFieldName}")`;

    assert.equal(transformResult, expectedResult);
  });
});
