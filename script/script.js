window.addEventListener('DOMContentLoaded', function(){
  let subMenu = document.querySelectorAll('.category-menu__link'); // Список всех кнопок с саб меню(хедер)
	let mobMenu = document.querySelector('.menu-button-mob'); // Кнопка бургер меню
	let mobClose = document.querySelector('.menu-close-mob'); // Кнопка закрытия меню бургера
	let searchForm = document.querySelector('.search__button'); // Кнопка поиска
	let seacrhFormClose = document.querySelector('.menu-closeSearch-mob'); // Закрытие формы поиска

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
});