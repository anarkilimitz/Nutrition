function cards() {
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
}

module.exports = cards;
