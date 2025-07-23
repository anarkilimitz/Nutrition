function modal() {
	//--------------Модальное окно--------------------------------------------

	// получаем дата-атрибуты
	const modalTrigger = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal');
	//          modalCloseBtn = document.querySelector('[data-close]');

	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = ''; // отменяем запрет прокрутки при выведении модального окна
	}

	modalTrigger.forEach((btn) => {
		btn.addEventListener('click', openModal);
	});

	function openModal() {
		modal.classList.add('show'); // показываем окно
		modal.classList.remove('hide'); // прячем окно
		document.body.style.overflow = 'hidden'; // не позволяет прокручивать страницу при появлении модального окна
		clearInterval(modalTimerId); // если пользователь сам открыл модальное окно, то таймер в 3 секунды срабатывать уже не будет
	}

	//    modalCloseBtn.addEventListener('click', closeModal); // функция closeModal будет выполнена только после click

	// чтобы пользователь мог закрыть модальное окно, кликая рядом с ним по области
	modal.addEventListener('click', (e) => {
		// e - объект события (event)
		if (e.target === modal || e.target.getAttribute('data-close') === '') {
			// если кликаем на Х - закрывается окно
			closeModal(); // запускаем функцию после того как условие выполнено
		}
	});
	// закрыть модальное окно по нажатии клавиши Esc
	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			// событие по кливише Esc
			closeModal(); // вызвать функцию, она закрывает модальное окно
		}
	});
	// всплытие модалки через 3 секунды автоматически
	const modalTimerId = setTimeout(openModal, 50000);

	// запускаем модалку при прокрутке страницы до конца
	function showModalByScroll() {
		if (
			window.scrollY + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight - 1
		) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll); // удаляем запуск модалки после первого появления, чтобы второй раз не запускалась
		}
	}
	window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;
