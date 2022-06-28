// Классы для HTML
// a href="#registration" class="popup-link" ссылка на открытие попапа
// close-popup - ссылка на закрытие попапа
// div id="registration" class="popup" - оболочка всего попапа
// lock-padding - класс для фиксированных элементов которым нужен добавочный паддинг для устранения дергания
// popup__content класс для "белго фона" попапа
// lock  - класс для body для свойства overflow: hiden;



document.addEventListener("DOMContentLoaded", () => {
	const popupLink = document.querySelectorAll(".popup-link");
	const body = document.querySelector("body");
	const lockPadding = document.querySelectorAll(".lock-padding");
	const popupCloseIcon = document.querySelectorAll('.close-popup');



	let unlock = true;
	const timeout = 800; // такое значение в скорости анимации в CSS transition

	if (popupLink.length > 0) {
		popupLink.forEach(item => {
			item.addEventListener("click", function (e) {
				const popupName = item.getAttribute('href').replace('#', '');
				const curentPopup = document.getElementById(popupName);
				popupOpen(curentPopup);
				e.preventDefault();
			})
		})
	}

	if (popupCloseIcon.length > 0) {
		popupCloseIcon.forEach(item => {
			item.addEventListener("click", function (e) {
				popupClose(item.closest('.popup'));
				e.preventDefault();
			})
		})
	}

	function popupOpen(curentPopup) {

		if (curentPopup && unlock) {
			const popupActive = document.querySelector('.popup.open');
			if (popupActive) {
				popupClose(popupActive, false);
			} else {
				bodyLock();
			}

			curentPopup.classList.add('open');
			curentPopup.addEventListener("click", function (e) {
				if (!e.target.closest('.popup__content')) {
					popupClose(e.target.closest('.popup'));
				}
			})
		}

	}

	function bodyLock() {
		const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';//вычисляем ширину скрола

		if (lockPadding.length > 0) {
			lockPadding.forEach(item => {
				item.style.paddingRight = lockPaddingValue;
			})
		}

		body.style.paddingRight = lockPaddingValue;
		body.classList.add('lock');

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, timeout);
	}

	function popupClose(popupActive, doUnlock = true) {
		if (unlock) {
			popupActive.classList.remove('open');
			if (doUnlock) {
				bodyUnLock();
			}
		}
	}

	function bodyUnLock() {
		setTimeout(function () {
			if (lockPadding.length > 0) {
				lockPadding.forEach(item => {
					item.style.paddingRight = '0px';
				})
			}
			body.style.paddingRight = '0px';
			body.classList.remove('lock');
		}, timeout)

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, timeout);
	}

	document.addEventListener('keydown', function (e) {
		if (e.which === 27) {
			const popupActive = document.querySelector('.popup.open');
			popupClose(popupActive);
		}
	})
});

(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
