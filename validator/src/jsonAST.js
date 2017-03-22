const util = require('util');
const json_ast = require('json-ast');
const assert = require('assert');
const parser = json_ast.parse;

const SOME_JSON = `
// some comment
{
    "field": "name",
    "label": "Name",
    "type": "text",
    "required": true,
    "help": "Enter a unique name for each Crowdstrike falcon host account.",
    "validators": [
        {
            "type": "string",
            "minLength": 1,
            "maxLength": 50,
            "errorMsg": "Length of Name is restricted from 1 to 50."
        },
        {
            "type": "regex",
            "pattern": "^\\w+$",
            "errorMsg": "Characters of Name should match regex ^\\w+$ ."
        }
    ]
}
`;

function parseJSON() {
  const tree = parser(SOME_JSON, {verbose : true, junker : true});
  assert(tree instanceof json_ast.AST.JsonDocument);

  console.log(util.inspect(tree, {colors : true, depth : 7}));
}

parseJSON();
