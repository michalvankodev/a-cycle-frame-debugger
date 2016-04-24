import {h} from '@cycle/dom'
import 'aframe-text-component'

export default function StreamLog(value, position) {
  return h(
    'a-box',
    {
      attributes: {
        depth: 0.1,
        height: 2,
        width: 5,
        color: '#cccccc',
        position: position,
        'look-at': '#camera'
      }
    },
    [
      h('a-entity', {
        attributes: {
          position: '-2 0 0.2',
          text: `text: ${value.toString()}; size: 0.3;`,
          material: 'color: #000000'
        }
      })
    ]
  )
}
