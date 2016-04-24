import {h} from '@cycle/dom'
import 'aframe-text-component'

export default function StreamLog(value, position, key) {
  return h(
    'a-box',
    {
      attributes: {
        depth: 0.1,
        height: 2,
        width: 2,
        color : 'rgba(0,255,0, 0.5)',
        opacity : 0.5,
        position: position,
        'look-at': '#camera'

      },
      key : 'stream-log' + key
    },
    [
      h('a-entity', {
        key : 'stream-log-text' + key,
        attributes: {
          position: '0 0 1',
          text: `text: ${value.toString()}; size: 0.3;`,
          material: 'color: #ffffff'
        }
      })
    ]
  )
}
