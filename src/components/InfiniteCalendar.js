import { ul, li } from '@cycle/dom';
import { Observable } from 'rx';

export default function InfiniteCalendar() {

    const view$ = Observable.just(
	    ul('.container', [
	    	li('.day', {'style': {
	    		'borderBottom': '1px solid black',
	    		'list-style-type': 'none',
	    		'font' : '42px arial, sans-serif'
	    	} }, '22')
	]));

    return { DOM: view$ }
}