const _ = require('lodash');

const obj1 = {
	stuff: [ 'a', 'b', 'c' ],
}

const obj2 = {
	stuff: [ 'a', 'c', 'd' ],
}

const merged = _.mergeWith(obj1, obj2, function(a, b) {
  if (_.isArray(a)) {
    return _.uniq(a.concat(b));
  }
});

console.log(merged)
