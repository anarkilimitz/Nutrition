function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);

	modal.classList.add('hide');
	modal.classList.remove('show');
	document.body.style.overflow = ''; // отменяем запрет прокрутки при выведении модального окна
}

function openModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);

	modal.classList.add('show'); // показываем окно
	modal.classList.remove('hide'); // прячем окно
	document.body.style.overflow = 'hidden'; // не позволяет прокручивать страницу при появлении модального окна

	console.log(modalTimerId);
	if (modalTimerId) {
		clearInterval(modalTimerId);
	}
	// если пользователь сам открыл модальное окно, то таймер в 3 секунды срабатывать уже не будет
}

function modal(triggerSelector, modalSelector, modalTimerId) {
	//--------------Модальное окно--------------------------------------------

	// получаем дата-атрибуты
	const modalTrigger = document.querySelectorAll(triggerSelector),
		modal = document.querySelector(modalSelector);
	//          modalCloseBtn = document.querySelector('[data-close]');

	modalTrigger.forEach((btn) => {
		btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
	});
	//    modalCloseBtn.addEventListener('click', closeModal); // функция closeModal будет выполнена только после click

	// чтобы пользователь мог закрыть модальное окно, кликая рядом с ним по области
	modal.addEventListener('click', (e) => {
		// e - объект события (event)
		if (e.target === modal || e.target.getAttribute('data-close') === '') {
			// если кликаем на Х - закрывается окно
			closeModal(modalSelector); // запускаем функцию после того как условие выполнено
		}
	});
	// закрыть модальное окно по нажатии клавиши Esc
	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			// событие по кливише Esc
			closeModal(modalSelector); // вызвать функцию, она закрывает модальное окно
		}
	});

	// запускаем модалку при прокрутке страницы до конца
	function showModalByScroll() {
		if (
			window.scrollY + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight - 1
		) {
			openModal(modalSelector, modalTimerId);
			window.removeEventListener('scroll', showModalByScroll); // удаляем запуск модалки после первого появления, чтобы второй раз не запускалась
		}
	}
	window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export { closeModal };
export { openModal };
