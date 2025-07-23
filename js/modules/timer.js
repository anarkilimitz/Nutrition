function timer() {
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
}

module.exports = timer;
