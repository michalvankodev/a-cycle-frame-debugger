import {h} from '@cycle/dom'
import 'aframe-text-component'

export default function StreamLog(logged$) {
  const view$ = logged$.map(value =>
    h(
      'a-box',
      {
        attributes: {
          depth: 0.1,
          height: 2,
          width: 5,
          color: '#cccccc'
        }
      },
      [
        h('a-entity', {
          attributes: {
            position: '-2 0 0.2',
            text: `text: ${value}; size: 0.3;`,
            material: 'color: #000000'
          }
        })
      ]
    )
  ).do(c => console.log(c))
  return {
    DOM: view$
  }
}
