import {h} from '@cycle/dom';
import _ from 'lodash';
import THREE from 'three';
/*this is for identifying a node*/
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
export const GUID = _.memoize(guid);
/*creates a nested array of the observable*/
function tree (stream$) {

  if (!stream$.source && !stream$._params) {
    return GUID(stream$);
  }
  else if (stream$._params || stream$.source._args) {
    return [GUID(stream$), (stream$._params || stream$.source._args).map(tree)];
  }
  else {
    return [GUID(stream$), [tree(stream$.source)]];
  }
}


function createSphere (id, i, a) {

  const vertices = _.uniq(new THREE.SphereGeometry( 10, a.length / 2, a.length / 2).vertices.map(({x,y,z}) => ([x,y,z].join(' '))));
  const v3 = vertices[(i * 7) % (vertices.length - 1)];
  return h('a-sphere', {
      key: 'ss',
      className: 'special',
      attributes: {
        position: v3,//`${(Math.tan(i * i) * Math.PI).toFixed(3)} ${(Math.sin(i) * Math.PI).toFixed(3)} ${(Math.cos(i) * Math.PI).toFixed(3)}`,
        radius: '.5',
        id : id.split('-')[0],
        color : '#' + id.slice(0,6),
        key : id
      }
  });
}

function createSpheres (items) {
  return items.map(createSphere);
}

/*wrap a-frame elements in container*/
export function wrap (spheres) {
  return h('a-entity', {}, spheres);
}





export default function IntersectionNodes({INSPECT}) {
  //map our the observable we are to expect and crreate a tree
  const tree$ = INSPECT.map(tree);
  //flatten the tree
  const flatTree$ = tree$.map(_.flattenDeep)
  //and exclude duplicates
  .map(_.uniq);
  const DOM = flatTree$
  //create spheres
    .map(createSpheres)

  const positions$ = DOM
  .map(s => s.map(s => s.properties.attributes.position))
  .map(s => s.map(s => s.split(' ').map(s => parseFloat(s))));

  return {
    tree$,
    flatTree$,
    positions$,
    DOM : DOM
  };
};
