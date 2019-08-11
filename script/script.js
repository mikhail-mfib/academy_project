'use strict';

window.addEventListener('DOMContentLoaded', () => {
    //слайдер экранов
    const slider = () => {
        //поиск всех постраничных ссылок и секций, которые будут в кач-ве слайдов
        const   pageLinks = document.querySelectorAll(`a[href^='#']`);
        let currentSection = document.querySelector('.active');
        
        //присваиваение класса секции, к которой был переход
        const changeActiveSection = (section) => {
            currentSection.classList.remove('active');
            section.classList.add('active');
            currentSection = section;
        };

        //определение id секции, к которой будет переход по скролу
        const defineSectionToScroll = (evt) => {
            let targetID;

            if (evt.deltaY < 0 && currentSection.previousElementSibling) {
                targetID = '#' + currentSection.previousElementSibling.id;
            }
            if (evt.deltaY > 0 && currentSection.nextElementSibling.id !== '') {
                targetID = '#' + currentSection.nextElementSibling.id;
            }
            
            return targetID;
        };

        //функция для анимации плавной прокрутки
        const scroll = (target) => {
            if(!target) {return;}

            const targetSection = document.querySelector(target),
                  targetY = targetSection.getBoundingClientRect().top,
                  currentScroll = window.pageYOffset;
            
            let start = null,
                progress,
                step;

            const scrollStep = (time) => {
                if (start === null) {start = time;}
                
                progress = (time - start) * 2;

                if(targetY < 0) {step = Math.max(currentScroll - progress, currentScroll + targetY);
                } else {step = Math.min(currentScroll + progress, currentScroll + targetY);}

                window.scrollTo(0, step);
                
                if (step != currentScroll + targetY) {requestAnimationFrame(scrollStep);
                } else {location.hash = target.hash;}
            };
        
            requestAnimationFrame(scrollStep);
            changeActiveSection(targetSection);
        };

        pageLinks.forEach(function(link) {
            link.addEventListener('click', function(evt) {
              evt.preventDefault();
              
              let target = evt.target.closest('a');
              scroll(target.hash);
            });
        });

        window.addEventListener('wheel', (evt) => {
            evt.preventDefault();

            scroll(defineSectionToScroll(evt));
        }, {passive: false});
    };

    slider();

    //отображение/скрытие мини меню
    const toggleMiniMenu = () => {
        const target = document.getElementById('main'),
              miniMenu = target.querySelector('.two-mini'),
              observerConfig = {attributes: true};

        const observer = new MutationObserver(() => {
            miniMenu.classList.toggle('d-none');
        });

        observer.observe(target, observerConfig);
    };

    toggleMiniMenu();

    //popup support
    const popupSupport = () => {
        const supportBtn = document.querySelector('.main-support'),
              modalSupport = document.querySelector('.modal_support');
              
        const handlerClass = (target, className) => {
                target.classList.toggle(className);
              };

        supportBtn.addEventListener('click', () => {
            handlerClass(modalSupport, 'd-none');
            handlerClass(supportBtn, 'd-none');
        });

        modalSupport.addEventListener('click', (evt) => {
            if(!evt.target.closest('.modal-dialog') || evt.target.matches(`img[aria-label='Close']`)) {
                handlerClass(modalSupport, 'd-none');
                handlerClass(supportBtn, 'd-none');
            }
        });
    };

    popupSupport();
});