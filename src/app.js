import {h, div} from '@cycle/dom';
import Calendar from './components/InfiniteCalendar';
import {Observable} from 'rx';
import _ from 'lodash';
import IntersectionNodes, {GUID} from './components/intersection-nodes';
import IntersectionLines from './components/intersection-lines';
import 'aframe-text-component'


function tree (stream$) {
  if (!stream$.source) {
    return stream$;
  }
  else if (stream$.source._args || stream$.source._params) {
    return [stream$, stream$.source._args || stream$.source._params];
  }
  else {
    return [stream$, stream$.source];
  }
}



export default function App({DOM, INSPECT}) {
  const intersectionNodes = IntersectionNodes({INSPECT});
  const intersectionLines = IntersectionLines({
    positions$ : intersectionNodes.positions$,
    tree$: intersectionNodes.tree$,
    flatTree$ : intersectionNodes.flatTree$
  });

  const valueLabels$ = INSPECT.map(tree)
  .map(_.flattenDeep)
  .map(_.uniq)
  .flatMapLatest(arrayOfStreams => {
    return Observable.combineLatest(...arrayOfStreams);
  })
  .combineLatest(intersectionNodes.positions$)

  .map(([values, positions]) => {
    return h('a-entity', {}, values.map((value, index) => {
      console.log(positions[index].join(' '), value);
      return h('a-entity', {
        attributes: {
          position: positions[index].join(' '),
          text: `text: ${value}; size: 1;`,
          material: 'color: #000000'
        }
      });
    }));
  });



  return {
    DOM: intersectionNodes.DOM.combineLatest(intersectionLines.DOM, valueLabels$)
    .map(items => h('a-scene', {}, [
      h('a-light', {attributes : {color : 'white'}})
    ].concat(_.flatten(items)))),

    INSPECT : Observable.just(Observable.interval(1187).merge(Observable.interval(1321)))
  };
};
/*
=======
import {h, div} from '@cycle/dom'
import Calendar from './components/InfiniteCalendar'
import VRView from './components/VRView'

export default function App({DOM}) {
  const calendar = Calendar()
  const VR = VRView({DOM})
  const view$ = calendar.DOM.combineLatest(VR.DOM,
    (calendarVTree, VRVTree) =>
      div('.container', [
        div('.calendar', [
          calendarVTree
        ]),
        VRVTree
      ])
  )
  return {
    DOM: view$
  }
}
>>>>>>> master
export default function getRandomColor() {
  let letters = '0123456789ABCDEF'.split('')
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}



*/
