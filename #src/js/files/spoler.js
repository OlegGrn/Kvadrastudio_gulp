const spollersArray = document.querySelectorAll("[data-spollers]");

if (spollersArray.length > 0) {
	//получение обычных спойллеров
	const spollersRegular = Array.from(spollersArray).filter(item => !item.dataset.spollers.split(",")[0]);
	// инициализация обычных спойллеров
	if (spollersRegular.length > 0) initSpollers(spollersRegular);

	//получение спойллеров c медиа запросами
	const spollersMedia = Array.from(spollersArray).filter(item => item.dataset.spollers.split(",")[0]);
	// инициализация спойллеров c медиа запросами
	if (spollersMedia.length > 0) {
		const breakpointsArray = []; // массив объектов с полной инфой по медиа запросам (тип, число, элемент)
		spollersMedia.forEach(item => {
			const params = item.dataset.spollers;
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});

		// получаем уникальные медиа запросы без повторений из собранного breakpointsArray 
		let midiaQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + '-width:' + item.value + 'px),' + item.value + ',' + item.type;
		});
		let setmidiaQueries = new Set(midiaQueries);// Set особый вид коллекции без повторений		
		midiaQueries = Array.from(setmidiaQueries);// массив уникальных значений из Set
		// например  ['(min-width:650px),650,min', '(max-width:800px),800,max']

		// работа с каждым уникальным значением массива midiaQueries
		midiaQueries.forEach(item => {
			const paramsArray = item.split(",");
			const mediaValue = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			// собираем массив объектов (спойлеров) с нужными условиями
			const spollersArr = breakpointsArray.filter(item => {
				if (item.value == mediaValue && item.type == mediaType) {
					return true;
				}
			});

			// вешаем обработчик на массив спойллеров по медиазапросу
			matchMedia.addListener(function () {
				initSpollers(spollersArr, matchMedia)

			});
			initSpollers(spollersArr, matchMedia);
		});
	}
}


function initSpollers(arr, mql = false) {
	arr.forEach(spollersBlock => {
		spollersBlock = mql ? spollersBlock.item : spollersBlock;
		if (mql.matches || !mql) {
			spollersBlock.classList.add('_init');
			initSpollerBody(spollersBlock);
			spollersBlock.addEventListener("click", setSpollerAction);
		} else {
			spollersBlock.classList.remove('_init');
			initSpollerBody(spollersBlock, false);
			spollersBlock.removeEventListener("click", setSpollerAction);
		}
	});
}

function initSpollerBody(block, hide = true) {
	const allSpolerTitles = block.querySelectorAll("[data-spoller]");
	if (allSpolerTitles.length > 0) {
		allSpolerTitles.forEach(title => {
			if (hide) {
				title.removeAttribute("tabindex");
				if (!title.classList.contains("_active")) {
					title.nextElementSibling.hidden = true;
				}
			} else {
				title.setAttribute("tabindex", "-1");
				title.nextElementSibling.hidden = false;
			}
		})
	}

}

function setSpollerAction(e) {
	const el = e.target;
	if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
		const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
		const spollerBlock = spollerTitle.closest('[data-spollers]');
		const oneSpoller = spollerBlock.hasAttribute('data-one-spoller') ? true : false;
		if (!spollerBlock.querySelectorAll('._slide').length) {

			if (oneSpoller && !spollerTitle.classList.contains('_active')) {
				hideSpollerBody(spollerBlock);
			}
			spollerTitle.classList.toggle("_active");
			_slideToggle(spollerTitle.nextElementSibling, 500);
		}
		e.preventDefault();
	}
}

function hideSpollerBody(block) {
	const spollerActiveTitle = block.querySelector('[data-spoller]._active');
	if (spollerActiveTitle) {
		spollerActiveTitle.classList.remove('_active');
		_slideUp(spollerActiveTitle.nextElementSibling, 500);
	}
}