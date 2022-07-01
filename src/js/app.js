'use strict';
import * as baseFunction from './modules/functions.js';
import './vendors/vendors.js';
import AOS from 'aos';
import IMask from 'imask';

// Проверка поддержки webP
baseFunction.testWebP();
window.addEventListener('load', (e) => {
    document.body.style.opacity = 1;
});
// Инит и опции библиотеки анимаций
AOS.init({
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'load', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    offset: 25, // offset (in px) from the original trigger point
    delay: 100, // values from 0 to 3000, with step 50ms
    duration: 1200, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

const mainToursSlider = new Swiper('.main-tours__slider', {
    slidesPerView: 1,
    speed: 800,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: 1,
    },

});

// const listItemSlider = new Swiper('.list-item__slider', {
//     slidesPerView: 1,
//     speed: 800,
//     effect: 'fade',
//     fadeEffect: {
//         crossFade: true
//     },
//     pagination: {
//         el: '.swiper-pagination',
//         type: 'bullets',
//         clickable: 1,
//     },
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },

// });

const reviewsSlider = new Swiper('.reviews__slider', {
    speed: 800,
    slidesPerView: 'auto',
    spaceBetween: 10,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        576: {
            spaceBetween: 30
        }
    }
});

document.body.addEventListener('click', (e) => {
    const target = e.target;
    //логика работы меню бургер
    if (target.closest('[data-burger-menu]')) {
        target.closest('[data-burger-menu]').classList.toggle('active');
        document.querySelector('[data-header-menu]').classList.toggle('show');
        document.body.classList.toggle('hidden');
    }
    // Закрытие модального окна конкретного тура
    if (target.closest('.tour-modal.show') && !target.closest('.tour-modal__content')) {
        target.closest('.tour-modal.show').classList.remove('show');
    }
    // Закрытие модального окна форфмы обратной связи
    if (target.closest('.book-modal.show') && !target.closest('.book-modal__wrapper')) {
        target.closest('.book-modal.show').classList.remove('show');
    }

    if (target.closest('.hidden-menu__list a') && document.querySelector('.hidden-menu.show')) {
        document.querySelector('.hidden-menu.show').classList.remove('show');
    }
});

// Маска на номера телефона
document.querySelectorAll('input[type="tel"]').forEach(input => {
    const mask = IMask(input, {
        mask: '+{7}(000) 000-00-00',
    });
});

//Аккардеон секции faq
$("[data-toggle-btn]").click(function () {
    $(this).parent().toggleClass('open')
    $(this).parent().find("[data-toggle-content]").slideToggle("slow");
});

//Календарь в модалке
$(function () {
    $.datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        prevText: 'Предыдущий',
        nextText: 'Следующий',
        currentText: 'Сегодня',
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
        dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
        dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        weekHeader: 'Не',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['ru']);
    $("#datepicker").datepicker({
        altFormat: "DD, d MM, yy",
        minDate: 0
    });
});