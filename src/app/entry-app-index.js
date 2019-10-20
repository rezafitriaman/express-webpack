import logMessage from './js/logger'
import './css/style.css'
// Log message to console
logMessage('A very war reza !');

let string = `<span class="dot"></span>`;
let targetHooks = document.querySelector('.linesq');

targetHooks.insertAdjacentHTML('afterend', string);

let dot = document.querySelector('.dot');

let switchthis = true;
setInterval(() => {


	if (switchthis) {
		switchthis = false;
		dot.classList.add('none');
	} else {
		switchthis = true;
		dot.classList.remove('none');
	}
},400);

// Needed for Hot Module Replacement
if(typeof(module.hot) !== 'undefined') {
	module.hot.accept() // eslint-disable-line no-undef
}
