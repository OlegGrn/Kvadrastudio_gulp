"use strict"

//* класс _req добавить к инпутам трубущим проверку formVlidate
//* класс _email добавить к инпутам-Mail трубущим проверку formVlidate

document.addEventListener("DOMContentLoaded", () => {

	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formVlidate(form);

		let formData = new FormData(form);
		formData.append('image', formImage.files[0]);

		if (error === 0) {
			form.classList.add('_sending');

			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				formPreview.innerHTML = '';
				form.reset();
				form.classList.remove('_sending');
			} else {
				alert('Ошбика');
				form.classList.remove('_sending');
			}


		} else {
			alert("Заполните обязательные поля");
		}


	}

	function formVlidate(form) {

		let error = 0;
		let formReq = document.querySelectorAll('._req');

		if (formReq.length > 0) {
			formReq.forEach(input => {
				formRemoveError(input);

				if (input.classList.contains('_email')) {
					if (emailTest(input)) {
						formAddError(input);
						error++;
					}
				} else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
					formAddError(input);
					error++;
				} else {
					if (input.value == '') {
						formAddError(input);
						error++;
					}
				}

			})
			return error;
		}
	}

	function formAddError(el) {
		el.parentElement.classList.add('_error');
		el.classList.add('_error');
	}

	function formRemoveError(el) {
		el.parentElement.classList.remove('_error');
		el.classList.remove('_error');
	}

	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
	// инпут в переменной
	const formImage = document.getElementById('formImage');
	// див для картинки превью в переменной
	const formPreview = document.getElementById('formPreview');
	// слушаем изменения в инпуте
	formImage.addEventListener('change', () => {
		uploadFile(formImage.files[0]);
	})

	function uploadFile(file) {
		// проверяем тип файлов
		if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
			alert('Разрешены только изображения');
			formImage.value = '';
			return;
		}
		// проверим размер файла( < 2 МБ)
		if (file.size > 2 * 1024 * 1024) {
			alert('Файл должен быть не менее 2 мб');
			return
		}
		let reader = new FileReader();
		reader.onload = function (e) {
			formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
		};
		reader.onerror = function (e) {
			alert('Ошибка');
		};
		reader.readAsDataURL(file);

	}
});