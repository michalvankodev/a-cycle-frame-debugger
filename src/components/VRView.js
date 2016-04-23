import {h, div} from '@cycle/dom'
import StreamLog from './StreamLog'

export function getRandomColor() {
  let letters = '0123456789ABCDEF'.split('')
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export default function VRView({DOM}) {
  const sphereClick$ = DOM.select('.special').events('click')
  const color$ = sphereClick$
    .startWith('')
    .map(() => getRandomColor())
    .shareReplay(1)
  const ColorStreamLog = StreamLog(color$)
  const view$ = color$.combineLatest(ColorStreamLog.DOM, (c, streamLogVTree) =>
    div('.vr', [
      h('a-scene', [
        h('a-light', {
          attributes: {
            color: 'white',
            position: '1 1 -1',
            type: 'ambient'
          }
        }),
        h(
          'a-camera',
          {
            attributes: {
              position: '0 0 5'
            }
          },
          [
            h('a-cursor', {
              attributes: {
                cursor: "fuse: false ; maxDistance: 30; timeout: 0.2",
                position: "0 0 -1",
                geometry: "primitive: circle; radius: 0.01",
                material: "color: green; shader: flat"
              }
            })
          ]
        ),
        h('a-sphere', {
          key: 'ss',
          className: 'special',
          attributes: {
            position: '0 1.25 -1',
            radius: '1.25',
            color: c
          }
        }),
        streamLogVTree
      ])
    ])
  )

  return {
    DOM: view$
  }
}
