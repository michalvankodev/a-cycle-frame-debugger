import {h, div} from '@cycle/dom';
import Calendar from './components/InfiniteCalendar';
import {Observable} from 'rx';
import _ from 'lodash';
import IntersectionNodes from './components/intersection-nodes';
import IntersectionLines from './components/intersection-lines';

export default function getRandomColor() {
  let letters = '0123456789ABCDEF'.split('')
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}







export default function App({DOM, INSPECT}) {
  const intersectionNodes = IntersectionNodes({INSPECT});
  const intersectionLines = IntersectionLines({
    positions$ : intersectionNodes.positions$,
    tree$: intersectionNodes.tree$,
    flatTree$ : intersectionNodes.flatTree$
  });


  return {
    DOM: intersectionNodes.DOM.combineLatest(intersectionLines.DOM)
    .map(items => h('a-scene', {}, [
      h('a-light', {attributes : {color : 'white'}})
    ].concat(items))),
    INSPECT : Observable.just(Observable.just(2).merge(Observable.just(3)))
  };
};
