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
