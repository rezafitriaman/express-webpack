import logMessage from './js/logger';
import './scss/style.scss';
import '../banners/rect/scss/rectStyle.scss';
import 'bootstrap';

// Log message to console
logMessage('A very wonderfull app!');

// Needed for Hot Module Replacement
if(typeof(module.hot) !== 'undefined') { // eslint-disable-line no-undef
	console.log('reza asdf'); // eslint-disable-line no-undef
	module.hot.accept() // eslint-disable-line no-undef
}


//todo met een command line bestanden pakken vanuit src naar eigen banner-map per afmetingen
//todo mappen aanmaken met commandlines - Jelmer
//todo versturen van de banner-bestanden naar DCO-preview met een knop of command-lines
//todo uniet-test
