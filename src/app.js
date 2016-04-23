import {h} from '@cycle/dom'

export default function getRandomColor() {
  let letters = '0123456789ABCDEF'.split('')
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export default function App({DOM}) {
  const sphereClick$ = DOM.select('.special').events('click')
  const color$ = sphereClick$.startWith('').map(() => getRandomColor())

  const view$ = color$.map(c => {
    return h('a-scene', [
      h('a-light', {
        attributes: {
          color: 'white',
          position: '1 1 -1',
          type: 'ambient'
        }
      }),
      h('a-camera', [
        h('a-cursor', {
          attributes: {
            cursor: "fuse: false ; maxDistance: 30; timeout: 0",
            position: "0 0 -5",
            geometry: "primitive: ring",
            material: "color: black; shader: flat"
          }
        })
      ]),
      h('a-sphere', {
        key: 'ss',
        className: 'special',
        attributes: {
          position: '0 1.25 -1',
          radius: '1.25',
          color: c
        }
      })

    ])
  })

  return {
    DOM: view$
  }
}

//
// <a-scene>
//
//       <a-sphere position="0 1.25 -1" radius="1.25" color="#EF2D5E"></a-sphere>
//       <a-box position="-1 0.5 1" rotation="0 45 0" width="1" height="1" depth="1"  color="#4CC3D9"></a-box>
//       <a-cylinder position="1 0.75 1" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
//       <a-plane rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
//
//       <a-sky color="#ECECEC"></a-sky>
//
//     </a-scene>
// //
