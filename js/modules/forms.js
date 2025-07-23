function forms() {
	// ---------------------  ФОРМЫ  ----------------------------------------

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
}

module.exports = forms;
