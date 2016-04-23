import {run} from '@cycle/core'
import 'aframe'
import {makeDOMDriver} from '@cycle/dom'
import App from './src/app'
import {Observable} from 'rx';

let drivers = {
  DOM: makeDOMDriver('#app'),
  INSPECT : (stream$ = Observable.just(0)) => {
    return stream$;
  }
}

run(App, drivers)
