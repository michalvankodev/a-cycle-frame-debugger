import {run} from '@cycle/core'
import 'aframe'
import {makeDOMDriver} from '@cycle/dom'
import App from './src/app'

let drivers = {
  DOM: makeDOMDriver('#app')
}

run(App, drivers)
