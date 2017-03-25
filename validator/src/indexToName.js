const PATTERN_INDEX = /\[(\d*)\]/;

// Transform all the index to their sepecific identity
export default function(json, path) {
  let identities = path.split('.');

  const replacement = {};
  let targetObject = json[identities[1]];
  identities.slice(2).forEach((d, i) => {
    if (PATTERN_INDEX.test(d)) {
      const index = d.match(PATTERN_INDEX)[1];

      targetObject = targetObject[d.replace(PATTERN_INDEX, '')];
      targetObject = targetObject[index];

      const name = targetObject.name || targetObject.field || targetObject.title;
      if (name) {
        replacement[i + 2] = `${d.replace(PATTERN_INDEX, '')}("${name}")`;
      }

    } else {
      targetObject = targetObject[d];
    }
  });
  identities = identities.map((d, i) => replacement[i] ? replacement[i] : d);

  return identities.join('.');
}
