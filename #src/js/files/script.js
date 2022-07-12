//! Общие функции================================================
function addActive(...args) {
	for (let arg of args) arg.classList.add("_active");
}
function removeActive(...args) {
	for (let arg of args) arg.classList.remove("_active");
}

function toggleActive(...args) {
	for (let arg of args) arg.classList.toggle("_active");
}


function addPading(arr) {

	let wrapper = document.querySelector(".wrapper");
	let body = document.querySelector("body");


	let lockPaddingValue = window.innerWidth - wrapper.offsetWidth + 'px';//вычисляем ширину скрола
	body.style.paddingRight = lockPaddingValue;// добавляем падинг body,  устраняем дергание экрана при body.style: overflow: hidden

	// добавляем падинг элементам массива arr, если есть необходимость (обычно это в header)
	if (arr.length > 0) {
		for (let el of arr) el.style.paddingRight = lockPaddingValue;
	}
}


function removePading(arr) {
	let body = document.querySelector("body");

	body.style.paddingRight = '0px';//удаляем паддинг, устраняем дергание экрана при body.style: overflow: hidden;

	// удаляем добавленный падинг элементам массива  arr, если есть необходимость
	if (arr.length > 0) {
		for (let el of arr) el.style.paddingRight = '0px';
	}
}
//!=======================================================================

document.addEventListener("DOMContentLoaded", () => {

	//? добаваляем точки - dd point after li class _point-add
	const allPoint = document.querySelectorAll("._point-add");
	if (allPoint) {
		allPoint.forEach((item, ind, arr) => {
			if (ind < arr.length - 1) {
				let point = document.createElement('li');
				point.className = "_point-add__point";
				item.after(point)
			}
		})
	}

	//? прячем меню при скролле ============
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
				item.classList.add("_active_anim-scroll");
			} else if (!item.classList.contains("_active_one")) {
				item.classList.remove("_active_anim-scroll");
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
//?=========== NEW TABS =============================
/*
1. Внешнему блоку управления табами (родителю) - data-tab-tabs="tabs" (содержимое атрибута "..." не имеет значения)
2. Кнопкам управления data-tab-btn="tab_01" (содержимое это путь к блоку)
3. Блокам data-tab-block="tab_01"
4. Блоку который нужно открыть первым по умолчанию класс "_active_first"
*/
document.addEventListener("DOMContentLoaded", () => {

	const tabs = document.querySelector("[data-tab-tabs]");//controll

	if (tabs) {
		tabs.addEventListener("click", (e) => {
			if (!e.target.closest("[data-tab-btn]")) return;

			let tabBtn = e.target.closest("[data-tab-btn]"); // элемент btn клика
			let parentTabBtn = e.target.closest("li"); // родитель li элемента btn
			let allLi = tabs.querySelectorAll("li"); // все Li
			let allTabBtn = document.querySelectorAll("[data-tab-btn]");// все кнопки управления табами
			let allTabBlock = document.querySelectorAll("[data-tab-block]") // все блоки с табами

			delActiveArr(allLi, allTabBtn, allTabBlock);
			addActiveTab(tabBtn, parentTabBtn);

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
		})
		// первый клик автоматически на выбранной ссылке на экране выше 767.98px
		//if (window.innerWidth > 767.98) document.querySelector("._active_first").click();		
		document.querySelector("._active_first").click();
	}
});
