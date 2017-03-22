const _ = require('lodash');
const schema = require('../schema.json');
const {Validator} = require('jsonschema');

function validateSchema(config) {
  const validator = new Validator();
  const res = validator.validate(config, schema);
  if(!res.errors.length) {
    res.errors = checkConfigDetails(config);
  }
  return {
    failed: !!res.errors.length,
    errors: res.errors
  };
}

function appendError(errors, err) {
  if (err) {
    errors.push(err);
  }
}

function checkDupKeyValues(config, isInput) {
  // Forbid dup name/title in services and tabs
  const servicesLikeArr = _.get(config, isInput ? 'services' : 'tabs');
  const errors = [];
  let error;

  if (servicesLikeArr) {
    const rootFieldName = isInput ? 'inputs.services' : 'configuration.tabs';

    ['name', 'title'].forEach(d => {
      error = parseArrForDupKeys(servicesLikeArr, d, rootFieldName);
      appendError(errors, error);
    });

    // Forbid dup value/label for items and autoCompleteFields
    const checkEntityDupKeyValues = ({options}, objPosition) => {
      if (options) {
        const {items} = options;
        let {autoCompleteFields} = options;
        if (items) {
          ['label', 'value'].forEach(d => {
            error = parseArrForDupKeys(items, d, `${objPosition}.options.items`);
            appendError(errors, error);
          });
        }

        if (autoCompleteFields) {
          const isGroupType = !!autoCompleteFields[0].children;

          // Label checker, allow same label exist in different group, but forbid same label in any single group
          const labelStoreList = isGroupType ?
              autoCompleteFields.map(d => d.children) : [autoCompleteFields];
          labelStoreList.forEach(d => {
              error = parseArrForDupKeys(d, 'label', `${objPosition}.options.autoCompleteFields`);
              appendError(errors, error);
          });

          if (isGroupType) {
              autoCompleteFields = _.flatten(_.union(autoCompleteFields.map(d => d.children)));
          }
          error = parseArrForDupKeys(autoCompleteFields, 'value', `${objPosition}.options.autoCompleteFields`);
          appendError(errors, error);
        }
      }
    };

      // Forbid dup field/label for entity
    servicesLikeArr.forEach((serviceLikeObj, i) => {
      const entityPosition = `${rootFieldName}[${i}].entity`;
      if (serviceLikeObj.entity) {
        ['field', 'label'].forEach(d => {
          error = parseArrForDupKeys(serviceLikeObj.entity, d, entityPosition);
          appendError(errors, error);
        });
        serviceLikeObj.entity.forEach((obj, i) => {
          checkEntityDupKeyValues(obj, `${entityPosition}[${i}]`);
        });
      }
    });
  }

  return errors;
}

// In this function, we can be sure that the config has already passed the basic schema validation
function checkConfigDetails({pages: {configuration, inputs}}) {
  let error, errors = [];

  const checkBaseOptions = (options) => {
      _.values(options).forEach(d => {
          const {error} = parseFunctionRawStr(d);
          appendError(errors, error);
      });
  };

  const checkEntity = (entity) => {
      _.values(entity).forEach(item => {
        const {validators} = item;

        _.values(validators).forEach(d => {
          switch (d.type) {
            case 'string':
              error = parseStringValidator(d.minLength, d.maxLength).error;
              break;
            case 'number':
              error = parseNumberValidator(d.range).error;
              break;
            case 'regex':
              error = parseRegexRawStr(d.pattern).error;
              break;
            default:
          }
          appendError(errors, error);
        });
      });
  };

  if (inputs) {
      const {services} = inputs;
      services.forEach(service => {
        const {entity, options} = service;
        checkBaseOptions(options);
        checkEntity(entity);
      });
      errors = errors.concat(checkDupKeyValues(inputs, true));
  }

  if(configuration) {
      configuration.tabs.forEach(tab => {
        const {entity, options} = tab;
        checkBaseOptions(options);
        checkEntity(entity);
      });
      errors = errors.concat(checkDupKeyValues(configuration, false));
  }

  return errors;
}

function parseFunctionRawStr(rawStr) {
  let error, result;

  try {
    result = eval(`(${rawStr})`);
  } catch (e) {
    error = `${rawStr} is not a function`;
  }

  return {error, result};
}

function parseRegexRawStr(rawStr) {
  let error, result;

  try {
    result = new RegExp(rawStr);
  } catch (e) {
    // error = `${rawStr}`;
    error = `${rawStr} is not a valid regular expression`;
  }

  return {error, result};
}

function parseArrForDupKeys(arr, targetField, entityName) {
  const uniqFieldsLength = _.uniqBy(arr, d => {
      if (_.isString(d[targetField])) {
        return d[targetField].toLowerCase();
      }
      return d[targetField];
  }).length;
  if (arr.length != uniqFieldsLength) {
    return `duplicate ${targetField} keys in entity ${entityName} is not allowed`;
  }
}

function parseNumberValidator(range) {
  const isRangeLegal = range.length === 2 && _.isNumber(range[0]) &&
    _.isNumber(range[1]) && range[0] <= range[1];

  const error = isRangeLegal ? undefined :
    `${JSON.stringify(range)} is not a valid number range`;

  return {error};
}

function parseStringValidator(minLength, maxLength) {
  const error = maxLength >= minLength ? undefined :
    `${minLength} ${maxLength} are not valid minimum and maximum values of string length`;

  return {error};
}

module.exports = {
    validate: validateSchema
};
