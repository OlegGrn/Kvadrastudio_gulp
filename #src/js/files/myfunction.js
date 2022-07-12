
"use strict";

//? Проверка устройства и добавление классов к html  ======================
// _touch  мобильные устройтсва
// _pc   компьютер


let isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};


if (isMobile.any()) {
	document.querySelector('html').classList.add('_touch');
} else {
	document.querySelector('html').classList.add('_pc');
}

//*=====================================================================================
//? активируем бургер

document.addEventListener("DOMContentLoaded", () => {

	const burger = document.querySelector(".burger");
	const body = document.querySelector("body");
	const menuBody = document.querySelector(".menu__body");
	const wrapper = document.querySelector(".wrapper");
	//let needPaddingRight = document.querySelectorAll(".t_paddingRight");// добавляем элементы которым нужен падднигСправа

	//добавляем паддинг, устраняем дергание экрана при body.style: overflow: hidden;
	function addPading(arr) {
		let lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';//вычисляем ширину скрола
		body.style.paddingRight = lockPaddingValue;// добавляем падинг body

		// добавляем падинг элементам массива needPaddingRight
		if (arr.length > 0) {
			for (let el of arr) el.style.paddingRight = lockPaddingValue;
		}
	}

	//удаляем паддинг, устраняем дергание экрана при body.style: overflow: hidden;
	function removePading(arr) {
		body.style.paddingRight = '0px';

		// удаляем добавленный падинг элементам массива  needPaddingRight
		if (arr.length > 0) {
			for (let el of arr) el.style.paddingRight = '0px';
		}
	}

	//исключения из правил, устраняем дергание экрана при body.style: overflow: hidden;


	function addActive(...args) {
		for (let arg of args) arg.classList.add("_active");
	}

	function removeActive(...args) {
		for (let arg of args) arg.classList.remove("_active");
	}


	wrapper.addEventListener("click", function (e) {
		if (e.target.closest(".burger") && !burger.classList.contains("_active")) {
			//addPading(needPaddingRight);
			addActive(burger, menuBody, wrapper);
		} else {
			removeActive(burger, menuBody, wrapper);
			//removePading(needPaddingRight);
		}
	});

	//? прячем меню при скролле =========================================================
	const hideMenu = function (entries) {
		entries.forEach((entry) => {
			const { target, isIntersecting } = entry; // получаем свойства, которые доступны в объекте entry
			if (isIntersecting) {
				target.classList.remove('_scroll');
			} else {
				target.classList.add('_scroll');// удаляем класс, когда элемент из неё выходит  
			}
		})
	}

	const headerObserver = new IntersectionObserver(hideMenu);
	headerObserver.observe(document.querySelector(".header"));
});


//? навигация к верху страницы ============================================

if (document.querySelector("._icon-arrow_up") != null) {
	document.querySelector("._icon-arrow_up").addEventListener("click", upPage);
}

function upPage(e) {
	window.scrollTo({
		top: 0,
		behavior: "smooth"
	});
	e.preventDefault();

}

//?==== SlideToggle  =======================================================================================

//SlideToggle  if () {
//  _slideToggle(elem) 
// } 
//========================================================================

let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}

//? навигация к заголовкам ============================================
//* атрибут в элементе <a> data-goto=".class"

if (document.querySelectorAll("a[data-goto]") != null) {
	document.querySelectorAll("a[data-goto]").forEach(item => {
		item.addEventListener("click", onMenuLinkClick);
	});
}

function onMenuLinkClick(e) {
	let menuLink = e.target;
	if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
		let nameClass = menuLink.dataset.goto;
		let MoveBlock = document.querySelector(nameClass);
		let boxMoveBlock = MoveBlock.getBoundingClientRect();
		let upMoveBlock = boxMoveBlock.top + window.pageYOffset - document.querySelector(".header").offsetHeight;
		e.preventDefault();

		if (document.querySelector(".menu__icon").classList.contains("_active")) {
			let menuIcon = document.querySelector(".menu__icon");
			let bodyLock = document.querySelector("body");
			let menuBody = document.querySelector(".menu__body");
			menuIcon.classList.remove("_active");
			bodyLock.classList.remove("_lock");
			menuBody.classList.remove("_active");
		}
		window.scrollTo({
			top: upMoveBlock,
			behavior: "smooth"
		});
		e.preventDefault();
	}
}
//? анимация / добабления класса _active при скроле ==============================
//* ==============================================================
// к элементу анимации добавить класс:  _anim-scroll_25
// число 25 это коэфициент анимации, значения от 0 до 100 (100 - пока элемент весь не покажется на экране)do

document.addEventListener("DOMContentLoaded", () => {

	let animItem = document.querySelectorAll('[class*="_anim-scroll"]');

	if (animItem.length > 0) {

		// запуск события
		window.addEventListener("scroll", animOnScroll);

		//== вызов уже видимых блоков + задержка анимации ===
		setTimeout(() => { animOnScroll() }, 700);
	}

	function animOnScroll() {

		let animItem = document.querySelectorAll('[class*="_anim-scroll"]');
		const namClas = "_anim-scroll_";

		animItem.forEach(item => {

			// значение задержки из названия класса
			let value = getStartAnim(item, namClas)

			// коэфициэнт регулировки старта анимации по высоте от величины блока. Максимум - это 100 ед ====
			const partItemOffStartAnim = value * 0.01;

			// высота блока
			const heightItem = item.offsetHeight;

			// текущее положение блока на странице
			const heightItemOffTopPage = item.getBoundingClientRect().top + window.pageYOffset;

			// текущая высота окна
			const heightWindow = windowHeight();
			function windowHeight() {
				let height = document.documentElement.clientHeight || document.body.clientHeight;
				return height;
			}

			let pointAnim = heightWindow - heightItem * partItemOffStartAnim;
			if (heightItem > heightWindow) {
				pointAnim = heightWindow - heightWindow * partItemOffStartAnim;
			}

			let startAnim = heightItemOffTopPage - pointAnim;
			let endAnim = heightItemOffTopPage + heightItem;

			// запрет анимации при скролле сверху вниз
			//   && (item.getBoundingClientRect().top > heightWindow)
			if (window.pageYOffset > startAnim && window.pageYOffset < endAnim) {
				item.classList.add("_active");
			} else if (!item.classList.contains("_active_one")) {
				item.classList.remove("_active");
			}

			// получение цифры из названия класса
			function getStartAnim(el, name) {
				//длина названия класса без цифр
				let length = name.length;
				// позиция начала названия класса
				let posName = el.className.indexOf(name);
				// позиция начала искомого числа в названии класса 
				let posNumb = posName + length;
				//получаем число из названия класса (условие - число из 2-х цифр, иначе - изменить цифру ниже)
				let risult = el.className.substr(posNumb, 2);
				return risult;
			}
		});
	}
});

//* ==============================================================
//? Меню BODY скрываем верхний скрол под полупрозрачное меню (без плашки)

if (document.querySelector(".menu__body_opacity") != 0) {
	let elem = document.querySelector(".menu__body_opacity");
	elem.addEventListener("scroll", hideMenuList);

}

function hideMenuList() {
	const arrLinkMenu = document.querySelectorAll(".menu__link");
	const header = document.querySelector(".header");
	let hightHeader = header.offsetHeight - 5;

	arrLinkMenu.forEach(item => {
		let hightOffTop = item.getBoundingClientRect().top;
		let hightOffBottom = item.getBoundingClientRect().top + item.clientHeight;

		let pointStart = hightOffTop + item.clientHeight / 4;
		let pointEnd = hightOffBottom - 12;
		let pointMidl = pointStart + (pointEnd - pointStart) / 2;

		hidenStart(item, pointStart);
		hedenMidl(item, pointMidl);
		hiddenEnd(item, pointEnd);

		function hidenStart(item, pointStart) {
			if (pointStart < hightHeader) {
				item.classList.add("_hiden_start");
			} else if (pointStart > hightHeader) {
				item.classList.remove("_hiden_start");
			}
		}

		function hedenMidl(item, pointMidl) {

			if (pointMidl < hightHeader) {
				item.classList.add("_hiden_midl");
			} else if (pointMidl > hightHeader) {
				item.classList.remove("_hiden_midl");
			}
		}


		function hiddenEnd(item) {
			if (pointEnd < hightHeader) {
				item.classList.add("_hiden_end");
			} else if (pointEnd > hightHeader) {
				item.classList.remove("_hiden_end");
			}
		}


	});
}

//======================================================================================================
//?=========== NEW TABS =============================
/*
1. Внешнему блоку управления табами (родителю) - data-tab-tabs="tabs" (содержимое атрибута "..." не имеет значения)
2. Кнопкам управления data-tab-btn="tab_01" (содержимое это путь к блоку)
3. Блокам data-tab-block="tab_01"
4. Блоку который нужно открыть первым по умолчанию класс "_active_first"
*/

document.addEventListener("DOMContentLoaded", () => {

	const tabs = document.querySelector("[data-tab-tabs]");
	if (tabs) {
		tabs.addEventListener("click", function (e) {

			if (!e.target.closest("[data-tab-btn]")) return;

			// элемент btn клика
			let tabBtn = e.target.closest("[data-tab-btn]");
			// родитель li элемента btn клика
			let parentTabBtn = e.target.closest("li");
			// все  li в блоке навигации по табам
			let allLi = tabs.querySelectorAll("li");

			let allTabBtn = document.querySelectorAll("[data-tab-btn]");
			let allTabBlock = document.querySelectorAll("[data-tab-block]")


			delActiveArr(allLi, allTabBtn, allTabBlock);
			addActiveTab(tabBtn, parentTabBtn);

			// добавить класс левому соседу LI (если нужно для стилизации)
			addPrevClas(parentTabBtn, allLi);
		});


		// первый клик автоматически на выбранной ссылке на экране выше 767.98px
		if (window.innerWidth > 767.98) document.querySelector("._active_first").click();


		function delActiveArr(...args) {
			for (let arg of arguments) {
				for (let ar of arg) {
					ar.classList.remove("_active")
				}
			}
		}
		function addActiveTab(btn, li) {
			let path = btn.dataset.tabBtn;
			let block = document.querySelector(`[data-tab-block="${path}"]`);

			btn.classList.add("_active");
			block.classList.add("_active");
			li.classList.add("_active");

		}
		function addPrevClas(li, allLi) {
			let prev = li.previousElementSibling;

			// удаляем прежние активированыые _prev_active
			allLi.forEach((item) => {
				item.classList.remove("_prev_active");
			});

			//добавляем класс _prev_active
			if (prev) {
				prev.classList.add("_prev_active");
			}
		}
	}
});

//?============================================================================================
//*Треугольник возле ссылки при тач-экране сlass="touch-arrow"


if (document.querySelectorAll(".touch-arrow").length > 0) {

	document.querySelectorAll(".touch-arrow").forEach(item => {
		item.addEventListener("click", function (e) {

			item.classList.toggle("_click_arrow");



			// присваиваем класс слудующему соседу дедушки клика
			//item.parentElement.nextElementSibling.classList.toggle("_click_text");
			_slideToggle(item.parentElement.nextElementSibling);


		});
	})
}

//========================================================================================================
//?============ затемняем меню======================
document.addEventListener("DOMContentLoaded", () => {
	let menuList = document.querySelector(".menu__list");
	let header = document.querySelector(".header");
	if (menuList && header) {
		window.addEventListener("scroll", function () {
			let topOffHeight = window.pageYOffset;

			if (topOffHeight > 110) {
				menuList.classList.add("_color");
				header.classList.add("_mini");
			} else {
				menuList.classList.remove("_color");
				header.classList.remove("_mini");
			}

		});
	}
});
//===============================================================================================


//*=====================================================================================
//? == brickwork   gallery =============================================================
//Из CSS получаем _brick grid-auto-rows (оптимально 1 или любое другое кратное чилсло высоте элементов)
//Из CSS получаем _brick__item margin-bottom, выстоупающее в роли ГЭПа для строк
// получаем высоту карточки из  _brick__item :before padding-top (изменить взависимости от ситуации)
// Как варинат, рассмотреть возможнось div обёртки и брать высоту из него
//Рабочие классы _brick и _brick__item
/*._brick {
	display: grid;
	column-gap: rem(30);
	row-gap: rem(0);
	grid-template-columns: repeat(auto-fit, minmax(rem(300), 1fr));
	grid-auto-rows: rem(1);
	
		&__item {
		margin-bottom: rem(30);
	}
}*/


document.addEventListener("DOMContentLoaded", () => {
	const grid = document.querySelector("._brick");
	let gridItem = document.querySelectorAll("._brick__item");
	const btnLoad = document.querySelector("#load-more");
	let loadStart = 0;
	let loadFirst = +grid.dataset.loadFirst;
	let loadMoreItems = +btnLoad.dataset.loadMore;

	function resizeAllGridItems() {
		gridItem.forEach(element => resizeGridItem(element)
		);
	}
	function resizeGridItem(e) {

		let gridStyle = getComputedStyle(grid);
		rowHeight = parseInt(gridStyle.gridAutoRows, 10);// получаем из CSS _brick grid-auto-rows
		rowGap = parseInt(getComputedStyle(e).marginBottom, 10);// получаем из CSS из _brick__item margin-bottom
		heightGridItem = parseInt(getComputedStyle(e, ':before').paddingTop, 10);// получаем из CSS?? из _brick__item :before padding-top
		rowSpan = Math.ceil((heightGridItem + rowGap) / (rowHeight));
		e.style.gridRow = "span " + rowSpan;
	}

	function loadItems(qty) {

		for (let i = loadStart; i < (loadStart + qty); i++) {
			gridItem[i].style.display = "block";
		}
		loadStart += qty;
	}

	//* интервал 300 ms, и вызовы через каждые 10 ms
	function loadItemsMore(qty) {
		for (let i = loadStart; i < (loadStart + qty); i++) {

			gridItem[i].style.opacity = "0";
			gridItem[i].style.display = "block";
			opacityAnim(gridItem[i], 300, 10);
		}
		loadStart += qty;
	}

	//! opacity с анимацией !!!!!  *********************************
	function opacityAnim(el, time, interval) {
		let start = Date.now();
		let timer = setInterval(() => {
			let timePassed = Date.now() - start;
			el.style.opacity = timePassed / time;
			if (timePassed >= time) clearInterval(timer);
		}, interval);
	}

	if (gridItem) {
		loadItems(loadFirst); // первичная загрузка элементов в количестве из атрибута в _brick data-load-first
		resizeAllGridItems(gridItem); // первичное измерение элементов 
		window.addEventListener("resize", resizeAllGridItems); // изменение размеров с изменением окна
	}

	// добавление элементов по клику, их количество в data-load-more кнопки
	if (btnLoad) {
		btnLoad.addEventListener("click", function (e) {

			e.preventDefault();

			if ((loadStart + loadMoreItems) < gridItem.length && loadMoreItems) {
				loadItemsMore(loadMoreItems);// загрузка с анимацией плавная
				resizeAllGridItems();
			} else {
				this.innerHTML = "No more";
			}
		})
	}
});
