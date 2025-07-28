require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';


// импортируем все функции
import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import calculator from './modules/calculator';
import { openModal } from './modules/modal';

// Назначение глобального обработчика событий DOMContentLoaded
// Назначаем его на window (так же можно на document)

window.addEventListener('DOMContentLoaded', () => {
	// всплытие модалки через 3 секунды автоматически
	const modalTimerId = setTimeout(
		() => openModal('.modal', modalTimerId),
		50000
	);

	tabs(
		'.tabheader__item',
		'.tabcontent',
		'.tabheader__items',
		'tabheader__item_active'
	);
	modal('[data-modal]', '.modal', modalTimerId);
	timer('.timer', '2026-12-31');
	cards();
	forms('form', modalTimerId);
	slider({
		container: '.offer__slider',
		slide: '.offer__slide',
		prevArrow: '.offer__slider-prev',
		nextArrow: '.offer__slider-next',
		totalCounter: '#total',
		currentCounter: '#current',
		wrapper: '.offer__slider-wrapper',
		field: '.offer__slider-inner',
	});
	calculator();
});
