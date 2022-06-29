//! Общие функции
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


// add point after li class _point-add
document.addEventListener("DOMContentLoaded", () => {
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
});
