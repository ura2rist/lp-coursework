window.addEventListener('DOMContentLoaded', function(){
  let subMenu = document.querySelectorAll('.category-menu__link'); // Список всех кнопок с саб меню(хедер)
	let mobMenu = document.querySelector('.menu-button-mob'); // Кнопка бургер меню
	let mobClose = document.querySelector('.menu-close-mob'); // Кнопка закрытия меню бургера
	let searchForm = document.querySelector('.search__button'); // Кнопка поиска
	let seacrhFormClose = document.querySelector('.menu-closeSearch-mob'); // Закрытие формы поиска
	let sel = document.querySelector('.selectCustom');	// Кастомный селектор

	/* Появление формы поиска */
	searchForm.addEventListener('click', function(event){
		if(event.currentTarget.type == 'button'){
			event.preventDefault();
			event.currentTarget.type = 'submit';
		}
		document.querySelector('.search-mob').classList.toggle('search-mob_active');
		document.querySelector('.search__text').classList.toggle('search__text_active');
		document.querySelector('.menu-closeSearch-mob').classList.toggle('menu-closeSearch-mob_active');
	});

	/* Закрытие формы поиска */
	seacrhFormClose.addEventListener('click', function(event){
		document.querySelector('.search-mob').classList.toggle('search-mob_active');
		document.querySelector('.search__text').classList.toggle('search__text_active');
		document.querySelector('.menu-closeSearch-mob').classList.toggle('menu-closeSearch-mob_active');
		searchForm.type = 'button';
	});

	/* Появление бургер меню */
	mobMenu.addEventListener('click', function(event){
		document.querySelector('.menu-container').classList.toggle('menu-container_active');
	});

	/* Закрытие бургера */
	mobClose.addEventListener('click', function(){
		document.querySelector('.menu-container').classList.toggle('menu-container_active');
	});

	/* Саб меню */
  subMenu.forEach(function(item){
    item.addEventListener('click', function(event){
			if(document.querySelector('.category-menu__link_active')){
				if(event.currentTarget.classList.contains('category-menu__link_active')){
					event.currentTarget.classList.toggle('category-menu__link_active');
				}else{
					document.querySelector('.category-menu__link_active').classList.remove('category-menu__link_active');
					event.currentTarget.classList.toggle('category-menu__link_active');
				}
			}else{
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

	const swiper2 =  new Swiper(".slider2", {
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

	document.querySelectorAll('.swiper2-slide-custom').forEach(function(item){
		item.addEventListener('click', function(event){
			document.querySelector('.modal-content').innerHTML = '';
			let cont = event.currentTarget.querySelector('.swiper-img').outerHTML + event.currentTarget.querySelector('.gallery__hide-content').outerHTML;
			document.querySelector('.modal-content').innerHTML = cont;
		})
	});

	const modal = new GraphModal();

	function viewCatalog(catalogActive){
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
	
	catalogButton.forEach(function(item){
		item.addEventListener('click',function(event){
			catalogActive = document.querySelector('.catalog__link-active').classList.remove('catalog__link-active');
			item.classList.add('catalog__link-active');
			viewCatalog(catalogActive = document.querySelector('.catalog__link-active'));
		});
	});

	document.querySelectorAll('.catalog__button').forEach(function(item){
		item.addEventListener('click', function(event){
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

	document.querySelector('#event__button').addEventListener('click', function(event){
		document.querySelector('#event__button').style.display = 'none';
		document.querySelectorAll('.event__element').forEach(function(item){
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

	function mobileSlederDestroy(){
		if(window.innerWidth > 660){
			swiper4 =  new Swiper(".slider4", {
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
		}else{
			if(swiper4Block.classList.contains('swiper-container-initialized')){
				console.log(1)
				swiper4.destroy();
			}
		}
	}
	mobileSlederDestroy();
	window.addEventListener('resize', () => {
		mobileSlederDestroy()
	});

	let editElem = document.querySelector('.editions__subtitle');

	editElem.addEventListener('click', function(event){
		editElem.classList.toggle('editions__subtitle_active');
		document.querySelector('.editions__list').classList.toggle('editions__list_show');
	});

	document.querySelectorAll('.editions__input-filter').forEach(function(element){
		element.addEventListener('change', function(event){
			let editInp = [];
			let editLi = ''
			editInp = document.querySelectorAll('.editions__input-filter:checked');
			editInp.forEach(function(element){
				editLi += '<li class="editions__element">' + element.closest('.editions__element').innerHTML + '<div class="edition__close"><span></span><span></span></div></li>';
			});
			let editUl = document.createElement('ul');
			editUl.className = 'editListener';
			editUl.innerHTML = editLi;
			if(document.querySelector('.editListener')){
				document.querySelector('.editListener').remove();
			}
			if(window.innerWidth < 660){
				document.querySelector('.editions__subtitle').after(editUl);
			}
		});
	});

	var swiper5 = new Swiper(".slider5", {
    loop: true,
    loopFillGroupWithBlank: true,
    navigation: {
      nextEl: ".projact-next",
    	prevEl: ".projact-prev",
    },
		breakpoints: {
			1: {
				slidesPerGroup: 1,
				slidesPerView: 1,
			},
			550: {
				slidesPerView: 2,
				spaceBetween: 50,
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
	function init(){
		var myMap = new ymaps.Map("contacts_map", {
				center: [55.75846806898367,37.60108849999989],
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
});