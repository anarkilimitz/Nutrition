function tabs() {
	//------------- ТАБЫ -------------------
	// Получаем нужные элементы
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	// скрываем элементы на странице (скрываем табы со страницы)
	function hideTabContent() {
		// forEach перебирает все элементы
		tabsContent.forEach((item) => {
			// item - дали название каждому отдельному контенту
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});
		// удаляем класс активности у каждого из элементов табов
		tabs.forEach((item) => {
			item.classList.remove('tabheader__item_active'); // не ставим точку т.к итак работаем с классами
		});
	}
	// создаем функцию, которая будет показывать нам табы
	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		// добавляем класс активности у каждого из элементов табов
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});
}

module.exports = tabs;