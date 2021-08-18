'use strict';
import * as $ from 'jquery';
import './jquery.validate.min.js';
import './jquery.inputmask.min';
import './slick.min';
import './select2.min';

const mobileWidth = 767;
let isMobile = checkWidth();

window.addEventListener('resize', () => {
    isMobile = checkWidth();
});

setTimeout(() => {
    if (!document.querySelector('.loader')) {
        return;
    }

    const loader = document.querySelector('.loader');
    if (loader.classList.contains('active')) {
        loader.classList.remove('active');

        setTimeout(() => {
            loader.parentElement.removeChild(loader);
        }, 300)
    }
}, 2500);

window.addEventListener('load', function () {

    (function loader() {
        if (!document.querySelector('.loader')) {
            return;
        }

        const loader = document.querySelector('.loader');

        if (loader.classList.contains('active')) {
            loader.classList.remove('active');
        }

        setTimeout(() => {
            loader.parentElement.removeChild(loader);
        }, 1500);

    })();

    (function mobMenu() {
        if (!document.querySelector('.mob-menu-btn')) {
            return;
        }

        const btn = document.querySelector('.mob-menu-btn');
        const menu = document.querySelector('.menu');

        btn.addEventListener('click', function (e) {
            e.preventDefault();

            this.classList.toggle('active');
            menu.classList.toggle('active');
            document.body.classList.toggle('no-scrolling');
        });

        if (btn.classList.contains('hide')) {
            btn.classList.remove('hide');
        }
    })();

    (function headerScrollHandler() {

        const header = document.querySelector('.header');
        let sticky = header.offsetTop;
        scrollHandler();

        window.addEventListener('scroll', scrollHandler);

        if (window.pageYOffset > sticky) {
            header.classList.add("scroll");
        }

        function scrollHandler() {
            if (window.pageYOffset > sticky) {
                header.classList.add("scroll");
            } else {
                header.classList.remove("scroll");
            }
        }
    })();

    (function menu() {
        if (!document.querySelector('.menu')) {
            return;
        }

        if (!document.getElementById('presents')) {
            return;
        }

        const prizes = document.getElementById('presents');
        let sticky = prizes.offsetTop - 275;

        const prizesMenuItem = [...document.querySelectorAll('.menu__item > a')]
            .filter(h => h.innerHTML === 'Продукт')[0];

        const mainMenuItem = [...document.querySelectorAll('.menu__item > a')]
            .filter(h => h.innerHTML === 'Главная')[0];

        prizesMenuItem.addEventListener('click', function(e) {
            if (document.querySelector('.menu').classList.contains('active')) {

                document.querySelector('.menu').classList.remove('active');
                document.body.style.overflowY = 'scroll';
                document.querySelector('.header').classList.remove('active');
                document.querySelector('.mob-menu-btn').classList.remove('active');
            }

            if (!this.classList.contains('active')) {
                this.classList.add('active');
            }
        });

        if (window.pageYOffset > sticky) {
            mainMenuItem.parentElement.classList.remove("active");
            prizesMenuItem.parentElement.classList.add("active");
        }

        window.addEventListener('scroll', scrollPrizes);

        function scrollPrizes() {
            if (window.pageYOffset > sticky) {
                mainMenuItem.parentElement.classList.remove("active");
                prizesMenuItem.parentElement.classList.add("active");
            } else {
                prizesMenuItem.parentElement.classList.remove("active");
                mainMenuItem.parentElement.classList.add("active");
            }
        }
    })();

    (function dropDowns() {
        if (!document.querySelector('.dropdown')) {
            return;
        }

        const dropdowns = [...document.querySelectorAll('.dropdown')];

        dropdowns.forEach(d => {
            const header = d.querySelector('.dropdown__header');

            header.addEventListener('click', function (e) {
                e.preventDefault();
                this.parentElement.classList.toggle('active');
            })
        })
    })();

    (function sliders() {
        if (!document.querySelector('.slider')) {
            return;
        }

        const sliders = $('.slider');
        let isSlick = document.querySelector('.slick-slider');

        sliderInit(isMobile, isSlick, sliders);

        window.addEventListener('resize', () => {
            sliderInit(isMobile, isSlick, sliders);
        });

        function sliderInit(isMob, isSlickExist, sliders) {
            if (isMob && !isSlickExist) {

                $.each(sliders,  function () {
                    $(this).slick({
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        prevArrow: '<div class="slick-prev"><svg width="23" height="36" viewBox="0 0 23 36" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                            '<path d="M22.252 4.8683C22.6604 4.47495 22.6604 3.821 22.252 3.42765L19.3861 0.667943C18.9988 0.29504 18.3861 0.29504 17.9988 0.667943L0.748038 17.2797C0.339558 17.673 0.339556 18.327 0.748038 18.7203L17.9988 35.3321C18.3861 35.705 18.9988 35.705 19.3861 35.3321L22.252 32.5723C22.6604 32.179 22.6604 31.5251 22.252 31.1317L9.36313 18.7203C8.95465 18.327 8.95465 17.673 9.36313 17.2797L22.252 4.8683Z" fill="#682700"/>\n' +
                            '</svg>\n</div>',
                        nextArrow: '<div class="slick-next"><svg width="23" height="36" viewBox="0 0 23 36" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                            '<path d="M0.748034 31.1317C0.339552 31.5251 0.339552 32.179 0.748034 32.5723L3.61391 35.3321C4.00115 35.705 4.61394 35.705 5.00118 35.3321L22.252 18.7203C22.6604 18.327 22.6604 17.673 22.252 17.2797L5.00119 0.667943C4.61394 0.295037 4.00116 0.295037 3.61391 0.667939L0.748038 3.42765C0.339557 3.821 0.339557 4.47495 0.748038 4.8683L13.6369 17.2797C14.0454 17.673 14.0454 18.327 13.6369 18.7203L0.748034 31.1317Z" fill="#682700"/>\n' +
                            '</svg></div>',
                        autoplay: false,
                    });
                });

                isSlick = true;
            } else if (!isMob && isSlickExist) {
                $.each(sliders,  function () {
                    $(this).slick('unslick');
                });

                isSlick = false;
            }
        }
    })();

    (function select() {
        if($('.select').length > 1) {
            $('select').each(function() {
                let $this = $(this).not('.select-search');
                let parent = $(this).not('.select-search').parents('.select');
                $this.select2({
                    minimumResultsForSearch: Infinity,
                    dropdownParent: parent
                });
            });
            $('.select-search').each(function() {
                let $this = $(this);
                let parent = $(this).parents('.select');
                $this.select2({
                    dropdownParent: parent
                });
            });
        } else {
            $('select').select2({
                minimumResultsForSearch: Infinity,
                dropdownParent: $('.select')
            });
        }
    })();

    (function mask() {
        function maskInit() {
            $(".phone-mask").inputmask({
                mask:"+7(999)999-99-99",
                "clearIncomplete": true
            });

            /*$(".card-mask").inputmask({
                mask:"9999-9999-9999-9999",
                "clearIncomplete": true
            });*/
        }
        maskInit();
    })();

    (function validate() {
        var form = $('form');

        $.each(form, function () {
            $(this).validate({
                ignore: [],
                errorClass: 'error',
                validClass: 'success',
                rules: {
                    name: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    phone: {
                        required: true,
                        phone: true
                    },
                    message: {
                        required: true
                    },
                    password: {
                        required: true,
                        normalizer: function normalizer(value) {
                            return $.trim(value);
                        }
                    }
                },
                errorElement : 'span',
                errorPlacement: function(error, element) {
                    var placement = $(element).data('error');
                    if (placement) {
                        $(placement).append(error);
                    } else {
                        error.insertBefore(element);
                    }
                },
                messages: {
                    phone: 'Некорректный номер',
                    email: 'Некорректный e-mail'
                }
            });
        });
        $.validator.addMethod('email', function (value, element) {
            return this.optional(element) || /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/.test(value);
        });
        $.validator.addMethod('phone', function (value, element) {
            return this.optional(element) || /\+7\(\d+\)\d{3}-\d{2}-\d{2}/.test(value);
        });
    })();

    (function accordion() {
        const wrap = $('.accordion-wrap');
        const accordion = wrap.find('.accordion-title');

        accordion.on('click', function () {
            const $this = $(this);
            const $parent = $(this).parent();
            const content = $this.next();

            if (content.is(':visible')) {
                $this.removeClass('active');
                $parent.removeClass('active');
                content.slideUp('fast');
            } else {
                $this.addClass('active');
                $parent.addClass('active');
                content.slideDown('fast');
            }

        });
    })();
});

function checkWidth() {
    return mobileWidth > document.documentElement.clientWidth;
}