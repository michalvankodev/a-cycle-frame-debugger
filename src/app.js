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
