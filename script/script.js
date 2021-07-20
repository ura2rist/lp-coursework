window.addEventListener('DOMContentLoaded', function () {
	let subMenu = document.querySelectorAll('.category-menu__link'); // Список всех кнопок с саб меню(хедер)
	let mobMenu = document.querySelector('.menu-button-mob'); // Кнопка бургер меню
	let mobClose = document.querySelector('.menu-close-mob'); // Кнопка закрытия меню бургера
	let searchForm = document.querySelector('.search__button'); // Кнопка поиска
	let seacrhFormClose = document.querySelector('.menu-closeSearch-mob'); // Закрытие формы поиска
	let sel = document.querySelector('.selectCustom');	// Кастомный селектор

	/* Появление формы поиска */
	searchForm.addEventListener('click', function (event) {
		if (event.currentTarget.type == 'button') {
			event.preventDefault();
			event.currentTarget.type = 'submit';
		}
		document.querySelector('.search-mob').classList.toggle('search-mob_active');
		document.querySelector('.search__text').classList.toggle('search__text_active');
		document.querySelector('.menu-closeSearch-mob').classList.toggle('menu-closeSearch-mob_active');
	});

	/* Закрытие формы поиска */
	seacrhFormClose.addEventListener('click', function (event) {
		document.querySelector('.search-mob').classList.toggle('search-mob_active');
		document.querySelector('.search__text').classList.toggle('search__text_active');
		document.querySelector('.menu-closeSearch-mob').classList.toggle('menu-closeSearch-mob_active');
		searchForm.type = 'button';
	});

	/* Появление бургер меню */
	mobMenu.addEventListener('click', function (event) {
		document.querySelector('.menu-container').classList.toggle('menu-container_active');
	});

	/* Закрытие бургера */
	mobClose.addEventListener('click', function () {
		document.querySelector('.menu-container').classList.toggle('menu-container_active');
	});

	/* Саб меню */
	subMenu.forEach(function (item) {
		item.addEventListener('click', function (event) {
			if (document.querySelector('.category-menu__link_active')) {
				if (event.currentTarget.classList.contains('category-menu__link_active')) {
					event.currentTarget.classList.toggle('category-menu__link_active');
				} else {
					document.querySelector('.category-menu__link_active').classList.remove('category-menu__link_active');
					event.currentTarget.classList.toggle('category-menu__link_active');
				}
			} else {
				event.currentTarget.classList.toggle('category-menu__link_active');
			}
		});
	});

	const swiper = new Swiper('.slider1', {
		speed: 2000,
		autoplay: {
			delay: 4000,
		},
		direction: 'horizontal',
		loop: true,
		allowTouchMove: false,
	});

	const swiper2 = new Swiper(".slider2", {
		slidesPerGroup: 3,
		slidesPerView: 3,
		slidesPerColumn: 2,
		spaceBetween: 50,
		pagination: {
			el: ".swiper-pagination",
			type: "fraction",
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			1: {
				slidesPerGroup: 1,
				slidesPerView: 1,
				slidesPerColumn: 1,
			},
			450: {
				slidesPerGroup: 2,
				slidesPerView: 2,
				spaceBetween: 34,
			},
			1300: {
				slidesPerGroup: 3,
				slidesPerView: 3,
				slidesPerColumn: 2,
				spaceBetween: 50,
			}
		}
	});

	const choices = new Choices(sel, {
		searchEnabled: false,
		shouldSort: false,
		itemSelectText: '',
	});

	document.querySelectorAll('.swiper2-slide-custom').forEach(function (item) {
		item.addEventListener('click', function (event) {
			document.querySelector('.modal-content').innerHTML = '';
			let cont = event.currentTarget.querySelector('.swiper-img').outerHTML + event.currentTarget.querySelector('.gallery__hide-content').outerHTML;
			document.querySelector('.modal-content').innerHTML = cont;
		})
	});

	const modal = new GraphModal();

	function viewCatalog(catalogActive) {
		let catalogImg = document.querySelector('.catalog__img');
		let catalogTitle = document.querySelector('.catalog__content-title');
		let catalogAge = document.querySelector('.catalog__age');
		let catalogText = document.querySelector('.catalog__text');

		catalogImg.src = catalogActive.dataset.img;
		catalogTitle.textContent = catalogActive.textContent;
		catalogAge.textContent = catalogActive.dataset.age;
		catalogText.textContent = catalogActive.dataset.text;
	}

	let catalogButton = document.querySelectorAll('.catalog__link');

	viewCatalog(catalogActive = document.querySelector('.catalog__link-active'));

	catalogButton.forEach(function (item) {
		item.addEventListener('click', function (event) {
			catalogActive = document.querySelector('.catalog__link-active').classList.remove('catalog__link-active');
			item.classList.add('catalog__link-active');
			viewCatalog(catalogActive = document.querySelector('.catalog__link-active'));
		});
	});

	document.querySelectorAll('.catalog__button').forEach(function (item) {
		item.addEventListener('click', function (event) {
			document.querySelector('.catalog__button_active').classList.remove('catalog__button_active');
			item.classList.add('catalog__button_active');
			document.querySelector('.catalog__list_active').classList.remove('catalog__list_active');
			document.querySelector(`.catalog__list-wrap[data-target="${item.dataset.path}"]`).classList.add('catalog__list_active')
			$('.catalog__accordion').accordion("refresh");
		});
	});

	$('.catalog__accordion').accordion({
		heightStyle: 'content',
	});

	document.querySelector('#event__button').addEventListener('click', function (event) {
		document.querySelector('#event__button').style.display = 'none';
		document.querySelectorAll('.event__element').forEach(function (item) {
			item.style.display = 'flex';
		});
	});

	let swiper3 = new Swiper(".slider3", {
		pagination: {
			el: ".swiper-pagination",
		},
	});

	let swiper4;
	let swiper4Block = document.querySelector('.slider4');

	function mobileSlederDestroy() {
		if (window.innerWidth > 660) {
			swiper4 = new Swiper(".slider4", {
				pagination: {
					el: ".editions__pag",
					type: "fraction",
				},
				navigation: {
					nextEl: '.editions__next',
					prevEl: '.editions__prev',
				},
				breakpoints: {
					660: {
						slidesPerGroup: 1,
						slidesPerView: 2,
						spaceBetween: 35,
					},
					1000: {
						slidesPerGroup: 1,
						slidesPerView: 2,
						spaceBetween: 50,
					},
					1501: {
						slidesPerGroup: 1,
						slidesPerView: 3,
						spaceBetween: 50,
					}
				}
			});
		} else {
			if (swiper4Block.classList.contains('swiper-container-initialized')) {
				swiper4.destroy();
			}
		}
	}
	mobileSlederDestroy();
	window.addEventListener('resize', () => {
		mobileSlederDestroy()
	});

	let editElem = document.querySelector('.editions__subtitle');

	function showEdit(){
		document.querySelectorAll('.editions__input-filter').forEach(function(val){
			if(val.checked){
				val.closest('.editions__element').classList.add('editions__element_show');
			}else{
				val.closest('.editions__element').classList.remove('editions__element_show');
			}
		})
	}

	showEdit();

	document.querySelectorAll('.editions__input-filter').forEach(function(elem){
		elem.addEventListener('change', function(event){
			showEdit();
		});
	});

	editElem.addEventListener('click', function (event) {
		document.querySelectorAll('.editions__element').forEach(function (item) {
			item.classList.toggle('editions__element_show-view');
		});
	});


	var swiper5 = new Swiper(".slider5", {
		navigation: {
			nextEl: ".projact-next",
			prevEl: ".projact-prev",
		},
		breakpoints: {
			1: {
				slidesPerGroup: 1,
				slidesPerView: 1,
			},
			767: {
				slidesPerView: 2,
				spaceBetween: 45,
				slidesPerGroup: 2,
			},
			1500: {
				slidesPerView: 3,
				spaceBetween: 50,
				slidesPerGroup: 3,
			}
		}
	});

	/* Карта */

	ymaps.ready(init);
	function init() {
		var myMap = new ymaps.Map("contacts_map", {
			center: [55.75846806898367, 37.60108849999989],
			zoom: 17
		});

		myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
			hintContent: 'Собственный значок метки',
			balloonContent: 'Это красивая метка'
		}, {
			iconLayout: 'default#image',
			iconImageHref: 'image/map_point.svg',
			iconImageSize: [30, 42],
			iconImageOffset: [-5, -38]
		}),

			myMap.geoObjects.add(myPlacemark)
	}

	tippy('#tooltip-first', {
		content: 'Пример современных тенденций - современная методология разработки',
		theme: 'center-align'
	});

	tippy('#tooltip-second', {
		content: 'Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции',
		theme: 'center-align'
	});

	tippy('#tooltip-third', {
		content: 'В стремлении повысить качество',
		theme: 'center-align'
	});

	new JustValidate('.contacts-request', {
		rules: {
			name: {
				required: true,
				minLength: 2,
				maxLenght: 10
			},
			tel: {
				required: true,
			},
		},
		messages: {
			name: {
				minLength: 'Слишком короткое имя',
				maxLenght: 'Слишком длинное имя',
			},
			name: 'Укажите имя',
			tel: 'Укажите номер телефона',
		},
		submitHandler: function (form, values, ajax) {
			$.ajax({
				url: 'send.php',
				method: 'POST',
				data: values,
				success: function (response) {
					new GraphModal().open('second');
				},
				error: function (response) {
					alert('AJAX submit error! \nResponse from server:' + response)
				}
			});
		},
	});

  const menuLinks = document.querySelectorAll('.menu-wrap__link');
  if(menuLinks.length > 0){
    menuLinks.forEach(function(menuLink){
      menuLink.addEventListener('click', onMenuLinkClick);
    });

    function onMenuLinkClick(e){
      const menuLink = e.target;
      if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
        const gotoBlock = document.querySelector(menuLink.dataset.goto);
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

        window.scrollTo({
          top: gotoBlockValue,
          behavior: 'smooth'
        });
        e.preventDefault();
      }
    }
  }
});