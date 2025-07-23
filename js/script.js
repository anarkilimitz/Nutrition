// Назначение глобального обработчика событий DOMContentLoaded
// Назначаем его на window (так же можно на document)

window.addEventListener('DOMContentLoaded', () => {
	// импортируем все функции
	const tabs = require('./modules/tabs'),
		modal = require('./modules/modal'),
		timer = require('./modules/timer'),
		cards = require('./modules/cards'),
		forms = require('./modules/forms'),
		slider = require('./modules/slider'),
		calculator = require('./modules/calculator');

	tabs();
	modal();
	timer();
	cards();
	forms();
	slider();
	calculator();
});
