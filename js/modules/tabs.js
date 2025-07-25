function tabs(
	tabsSelector,
	tabsContentSelector,
	tabsParentSelector,
	activeClass
) {
	//------------- ТАБЫ -------------------
	// Получаем нужные элементы
	const tabs = document.querySelectorAll(tabsSelector),
		tabsContent = document.querySelectorAll(tabsContentSelector),
		tabsParent = document.querySelector(tabsParentSelector);

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
			item.classList.remove(activeClass); // не ставим точку т.к итак работаем с классами
		});
	}
	// создаем функцию, которая будет показывать нам табы
	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		// добавляем класс активности у каждого из элементов табов
		tabs[i].classList.add(activeClass);
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;

		if (target && target.classList.contains(tabsSelector.slice(1))) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});
}

export default tabs;
