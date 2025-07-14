'use strict';
// Назначение глобального обработчика событий DOMContentLoaded
// Назначаем его на window (так же можно на document)
window.addEventListener('DOMContentLoaded', () => {
	//------------- ТАБЫ -----------------------------------------------------------------
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
	// ----------------- Таймер обратного отсчета ----------------------------

	const deadline = '2024-12-19';

	function getTimeRemaining(endtime) {
		let days, hours, minutes, seconds;
		//получаем разницу в миллисекундах
		const t = Date.parse(endtime) - Date.parse(new Date());
		// если дата прошла, то выводим все нули
		if (t <= 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		} else {
			(days = Math.floor(t / (1000 * 60 * 60 * 24))), // дни
				(hours = Math.floor((t / (1000 * 60 * 60)) % 24)), // часы
				(minutes = Math.floor((t / 1000 / 60) % 60)), // минуты
				(seconds = Math.floor((t / 1000) % 60)); // секунды
		}

		return {
			total: t,
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		};
	}

	function getZiro(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock(); // запускаем вручную сразу, чтобы не ждать 1000мс, чтобы не мигало

		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZiro(t.days);
			hours.innerHTML = getZiro(t.hours);
			minutes.innerHTML = getZiro(t.minutes);
			seconds.innerHTML = getZiro(t.seconds);

			if (t.total <= 0) {
				// если таймер равен нулю или меньше
				clearInterval(timeInterval); // останавливаем интервал
			}
		}
	}

	setClock('.timer', deadline);

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

	// Используем классы для карточек

	// Формируем элемент на странице, что в нем должно храниться
	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 65;
			this.changeToUAH(); // сработает метод, вернет измененное значение конвертации
		}
		// создаем метод для конвертации валют
		changeToUAH() {
			this.price = this.price * this.transfer;
		}
		// помещаем структуру HTML в отдельный div
		// какие методы у элемента есть, который сформировыли выше
		render() {
			const element = document.createElement('div');

			if (this.classes.length === 0) {
				this.classes = 'menu__item';
				element.classList.add(this.classes);
			} else {
				this.classes.forEach((className) => element.classList.add(className));
			}

			element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
            `;
			this.parent.append(element);
		}
	}
	//получаем данные карточек
	const getResource = async (url) => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	};
	// размещаем карточки на странице при помощи запроса GET
	// getResource('http://localhost:3000/menu').then((data) => {
	// 	data.forEach(({ img, altimg, title, descr, price }) => {
	// 		new MenuCard(
	// 			img,
	// 			altimg,
	// 			title,
	// 			descr,
	// 			price,
	// 			'.menu .container'
	// 		).render();
	// 	});
	// });

	// то же что и выше, только при помощи axios
	axios.get('http://localhost:3000/menu').then((data) => {
		data.data.forEach(({ img, altimg, title, descr, price }) => {
			new MenuCard(
				img,
				altimg,
				title,
				descr,
				price,
				'.menu .container'
			).render();
		});
	});

	// ---------------------  ФОРМЫ  -----------------------------------------------------

	const forms = document.querySelectorAll('form');

	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Скоро мы с вами свяжемся.',
		failure: 'Что-то пошло не так...',
	};

	forms.forEach((item) => {
		bindPostData(item);
	});

	// выношу отдельно функционал по общению с сервером
	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: data,
		});

		return await res.json();
	};

	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			// навешиваем событие отправки submit на кнопку отправки
			e.preventDefault(); // событие чтобы страница не перезагружалась

			const statusMessage = document.createElement('img'); // спиннер загрузки
			statusMessage.src = message.loading; // будет подгружаться спиннер
			statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
			//            form.append(statusMessage); // отправить сообщение на страницу к форме
			form.insertAdjacentElement('afterend', statusMessage); // отправить сообщение на страницу к форме
			// трансформация formData в JSON формат ниже
			const formData = new FormData(form); // собираем все данные из нашей формы

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			// --------- Fetch API (отправляем данные при помощи fetch)-------
			postData('http://localhost:3000/requests', json)
				.then((data) => {
					console.log(data); // data - данные которые вернул сервер из промиса
					showThanksModal(message.success);
					statusMessage.remove();
				})
				.catch(() => {
					// если предыдущий код не выполнится, то
					showThanksModal(message.failure); // выводим сообщение об ошибке
				})
				.finally(() => {
					form.reset(); // удаляем сообщение
				});

			// request.addEventListener('load', () => {  // мы отслеживаем конечную загрузку конечного запроса
			//     if (request.status === 200) {
			//         console.log(request.response);
			//         showThanksModal(message.success);
			//         form.reset(); // удаляем сообщение
			//         statusMessage.remove();
			//     } else {
			//         showThanksModal(message.failure);
			//     }
			// });
		});
	}
	// ------------  Работа с модальным окном  --------------------------------

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide'); // скрываем старое модальное окно
		openModal(); // открывает модальное окно

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" date-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove(); // удаляем блок после выполнения через 4 сек
			prevModalDialog.classList.add('show'); // показать блок
			prevModalDialog.classList.remove('hide'); // удалить hide
			closeModal();
		}, 4000);
	}
	// ---------------- Fetch API -------------------------------------------------------

	// fetch('https://jsonplaceholder.typicode.com/posts', { // изменили в конце на posts
	//     method: "POST",
	//     body: JSON.stringify({ name: 'Alex' }),
	//     headers: {
	//         'Content-type': 'application/json'  // настройка запроса
	//     }
	// })
	//     .then(response => response.json()) // возвращается Promise
	//     .then(json => console.log(json))

	// База данных
	fetch('http://localhost:3000/menu')
		.then((date) => date.json())
		.then((res) => console.log(res));

	// Слайдер
	const slides = document.querySelectorAll('.offer__slide'),
		slider = document.querySelector('.offer__slider'),
		prev = document.querySelector('.offer__slider-prev'),
		next = document.querySelector('.offer__slider-next'),
		total = document.querySelector('#total'),
		current = document.querySelector('#current'),
		slidesWrapper = document.querySelector('.offer__slider-wrapper'),
		slidesField = document.querySelector('.offer__slider-inner'),
		width = window.getComputedStyle(slidesWrapper).width; // получаем ширину окна слайдера

	let slideIndex = 1;
	let offset = 0;

	if (slides.length < 10) {
		total.textContent = `${slides.length}`;
		current.textContent = `${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}

	slidesField.style.width = 100 * slides.length + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';

	slidesWrapper.style.overflow = 'hidden';

	slides.forEach((slide) => {
		slide.style.width = width;
	});
	// Точки

	slider.style.position = 'relative';

	const dots = document.createElement('ol');
	const dotsArr = [];
	dots.classList.add('carousel-dots');
	dots.style.cssText = `
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 15;
		display: flex;
		justify-content: center;
		margin-right: 15%;
		margin-left: 15%;
		list-style: none;
	`;
	slider.append(dots);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.style.cssText = `
			box-sizing: content-box;
			flex: 0 1 auto;
			width: 30px;
			height: 6px;
			margin-right: 3px;
			margin-left: 3px;
			cursor: pointer;
			background-clip: padding-box;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			background-color: #fff;
			opacity: 0.3;
			transition: opacity 0.6s ease;
	`;
		if (i == 0) {
			dot.style.opacity = 1;
		}
		dots.append(dot);
		dotsArr.push(dot);
	}

	next.addEventListener('click', () => {
		if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += +width.slice(0, width.length - 2);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		if (slides.length < 10) {
			current.textContent = `${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		dotsArr.forEach((dot) => (dot.style.opacity = '0.3'));
		dotsArr[slideIndex - 1].style.opacity = 1;
	});

	prev.addEventListener('click', () => {
		if (offset == 0) {
			offset = +width.slice(0, width.length - 2) * (slides.length - 1);
		} else {
			offset -= +width.slice(0, width.length - 2);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		if (slides.length < 10) {
			current.textContent = `${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		dotsArr.forEach((dot) => (dot.style.opacity = '0.3'));
		dotsArr[slideIndex - 1].style.opacity = 1;
	});

	dotsArr.forEach((dot) => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = +width.slice(0, width.length - 2) * (slideTo - 1);

			slidesField.style.transform = `translateX(-${offset}px)`;

			if (slides.length < 10) {
				current.textContent = `${slideIndex}`;
			} else {
				current.textContent = slideIndex;
			}

			dotsArr.forEach((dot) => (dot.style.opacity = '.3'));
			dotsArr[slideIndex - 1].style.opacity = 1;
		});
	});

	// Самый простой слайдер
	// showSlides(slideIndex);

	// if (slides.length < 10) {
	// 	total.textContent = `${slides.length}`;
	// } else {
	// 	total.textContent = slides.length;
	// }

	// function showSlides(n) {
	// 	if (n > slides.length) {
	// 		slideIndex = 1;
	// 	}
	// 	if (n < 1) {
	// 		slideIndex = slides.length;
	// 	}

	// 	slides.forEach((item) => (item.style.display = 'none'));

	// 	slides[slideIndex - 1].style.display = 'block';

	// 	if (slides.length < 10) {
	// 		current.textContent = `${slideIndex}`;
	// 	} else {
	// 		current.textContent = slideIndex;
	// 	}
	// }

	// function plusSlides(n) {
	// 	showSlides((slideIndex += n));
	// }

	// prev.addEventListener('click', () => {
	// 	plusSlides(-1);
	// });

	// next.addEventListener('click', () => {
	// 	plusSlides(1);
	// });
});
