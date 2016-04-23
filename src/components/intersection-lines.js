import {h} from '@cycle/dom';
import _ from 'lodash';
import {wrap} from './intersection-nodes';

var Hook = function(){}
Hook.prototype.hook = function(node, propertyName, previousValue) {
  _.delay(() => {
     node.setAttribute('look-at', _.values(node.getAttribute('look-at')).join(' '));
  }, 0);
}

function deltaV3 ([x0,y0,z0], [x1,y1,z1]) {
  return [(x0 - x1)/2, (y0 - y1)/2, (z0 - z1) /2]
}
function lengthV3 ([x0,y0,z0], [x1,y1,z1]) {
  const [x,y,z] = [x0 - x1, y0 - y1, z0 - z1];
  return Math.sqrt(x*x+y*y+z*z);
}

function connections ([key, ids = null], table = {}) {
  const arr = (table[key] = table[key] || []);
  ids.map((s) => _.isString(s) ? arr.push(s) : arr.push(s[0]) && connections(s, table));
  return table;
}

export default function ({tree$, positions$, flatTree$}) {
  const connections$ = tree$.map(tree => connections(tree, {}));

  const lines$ = positions$.zip(flatTree$).map(([values, keys]) => _.zipObject(keys, values)).combineLatest(connections$, (vectors, connections) => {
    return _.flattenDeep(_.map(connections, (nodes, to) => {
      return _.map(nodes).map((from) => {
        const depth = lengthV3(vectors[from], vectors[to]);
        const v3 = deltaV3(vectors[to], vectors[from]);
        return h('a-box', {'my-hook' : new Hook() ,
          attributes : {
            'look-at' : vectors[to].join(' '),
            width : .1,
            depth,
            height : .1,
            'color' : `#${from.slice(0, 6)}`,
            position : vectors[from].map((x, i) => x + v3[i]).join(' ')}})
      });
    }));
  });
  return {
    DOM : lines$.map(wrap)
  }
}
