import {h} from '@cycle/dom'
import 'aframe-text-component'

export default function StreamLog(value, position, key) {
  return h(
    'a-box',
    {
      attributes: {
        depth: 0.1,
        height: 1,
        width: 1,
        color: '#cccccc',
        position: position,
        'look-at': '#camera'
      },
      key : 'stream-log' + key
    },
    [
      h('a-entity', {
        key : 'stream-log-text' + key,
        attributes: {
          position: '-2 0 0.2',
          text: `text: ${value.toString()}; size: 0.3;`,
          material: 'color: #000000'
        }
      })
    ]
  )
}
