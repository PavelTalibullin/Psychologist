"use strict";

const isMobile = {
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
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

// Плавный скролл

const menuLinks = document.querySelectorAll(".menu__link[data-goto]");
if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (
      menuLink.dataset.goto &&
      document.querySelector(menuLink.dataset.goto)
    ) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue =
        gotoBlock.getBoundingClientRect().top + pageYOffset;

		  if (document.querySelector(".header").classList.contains("open")) {
			document.querySelector(".header").classList.remove("open");
			document.querySelector('body').classList.remove("_lock");
		  }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth",
      });
      e.preventDefault();
    }
  }
}

// Бургер
const nav = document.getElementById("header__nav");
let contact = '<div class="d-flex header__contact"><a href="#"><img src="/images/icon/insta.svg" alt="instagram" class="header__contact_img"></a><a href="#"><img src="/images/icon/teleg.svg" alt="telegram" class="header__contact_img"></a><a href="#"><img src="/images/icon/whats.svg" alt="whatsapp" class="header__contact_img header__contact_img_ml"></a></div>';
let burgerMenu = '<nav class="header__nav" id="header__nav"><ul class="d-flex header__nav_list"><li><a data-goto=".page__section_1" href="#" class="menu__link">Обо мне</a></li><li><a data-goto=".page__section_2" href="#" class="menu__link">С чем я работаю</a></li><li><a data-goto=".page__section_3" href="#" class="menu__link">Цены</a></li><li><a data-goto=".page__section_4" href="#" class="menu__link">Отзывы</a></li></ul></nav>';

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("burger").addEventListener("click", function () {
    document.querySelector(".header").classList.toggle("open");
	 document.body.classList.toggle('_lock');
  });
});

// Закрыть меню при клике вне его
document.getElementById("header__nav").addEventListener("click", (event) => {
  event._isClickWithInMenu = true;
});
document.getElementById("burger").addEventListener("click", (event) => {
  event._isClickWithInMenu = true;
});
document.body.addEventListener("click", (event) => {
  if (event._isClickWithInMenu) return;
  // Действие при клике
  document.querySelector(".header").classList.remove("open");
  document.querySelector('body').classList.remove("_lock")
});
