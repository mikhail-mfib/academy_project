'use strict';

window.addEventListener('DOMContentLoaded', () => {
    //слайдер экранов
    const slider = () => {
        //поиск всех постраничных ссылок и секций, которые будут в кач-ве слайдов
        const pageLinks = document.querySelectorAll(`a[href^='#']`);
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
        const scroll = (target, speed = 2) => {
            if(!target) {return;}

            const targetSection = document.querySelector(target),
                  targetY = targetSection.getBoundingClientRect().top,
                  currentScroll = window.pageYOffset;
            
            let start = null,
                progress,
                step;

            const scrollStep = (time) => {
                if (start === null) {start = time;}
                
                progress = (time - start) * speed;

                if(targetY < 0) {
                    step = Math.max(currentScroll - progress, currentScroll + targetY);
                } else {
                    step = Math.min(currentScroll + progress, currentScroll + targetY);
                }

                window.scrollTo(0, step);
                
                if (step != currentScroll + targetY) {
                    requestAnimationFrame(scrollStep);
                } else {
                    location.hash = target.hash;
                }
            };
        
            requestAnimationFrame(scrollStep);
            changeActiveSection(targetSection);
        };

        //слушатели
        pageLinks.forEach(function(link) {
            link.addEventListener('click', function(evt) {
              evt.preventDefault();
              
              let target = evt.target.closest('a');
              if(evt.target.closest('.two-menu')) {
                scroll(target.hash, 8);
              } else {
                scroll(target.hash);
              }
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

        //анимация выезжающей кнопки
        const animate = (duration) => {
            let start = performance.now();
          
            requestAnimationFrame(function animate(time) {
                // timeFraction изменяется от 0 до 1
                let timeFraction = (time - start) / duration,
                    progress = +(timeFraction * 13).toFixed(2);

                if (timeFraction < 1) {requestAnimationFrame(animate);}
                if (progress > 13) {progress = 13;}

                supportBtn.style['margin-right'] = `${-13 + progress}rem`;
            
              });
        };

        //слушатели
        supportBtn.addEventListener('click', () => {
            if(document.body.clientWidth < 1199 && supportBtn.style['margin-right'] !== '0rem') {
                animate(300);
                return;
            }

            handlerClass(modalSupport, 'd-none');
            handlerClass(supportBtn, 'd-none');
        });

        modalSupport.addEventListener('click', (evt) => {
            if(!evt.target.closest('.modal-dialog') || evt.target.matches(`img[aria-label='Close']`)) {
                handlerClass(modalSupport, 'd-none');
                handlerClass(supportBtn, 'd-none');
                supportBtn.removeAttribute('style');
            }
        });
    };

    popupSupport();

    //popup offer
    const popupOffer = () => {
        const offerBtns = document.querySelectorAll('.main-try'),
              modalOffer = document.querySelector('.modal_offer'),
              modalSupport = document.querySelector('.modal_support'),
              footerY = document.querySelector('footer').getBoundingClientRect().height,
              mapY = document.getElementById('map').getBoundingClientRect().height,
              endSlideY = footerY + mapY;
        
        let modalPopupCount = 0;
              
        const handlerClass = (target, className) => {
            target.classList.toggle(className);
            modalPopupCount++;
        };

        //popup через 60сек
        setTimeout(() => {
            if(modalOffer.classList.contains('d-none') && 
               modalSupport.classList.contains('d-none') &&
               modalPopupCount === 0) 
            {
                handlerClass(modalOffer, 'd-none');
            }
        }, 60 * 1000);
        //popup при пролистывании до конца
        const popupEndSlide = () => {
            if(document.body.offsetHeight - window.scrollY <= endSlideY && modalPopupCount === 0) {
                handlerClass(modalOffer, 'd-none');
                window.removeEventListener('scroll', popupEndSlide);
            }
        };

        offerBtns.forEach((offerBtn) => {
            offerBtn.addEventListener('click', (evt) => {
                if(!evt.target.closest('#eleven')) {
                    handlerClass(modalOffer, 'd-none');
                }
            });
        });

        modalOffer.addEventListener('click', (evt) => {
            if(!evt.target.closest('.modal-dialog') || evt.target.matches(`img[aria-label='Close']`)) {
                handlerClass(modalOffer, 'd-none');
            }
        });

        window.addEventListener('scroll', popupEndSlide);
    };

    popupOffer();

    //калькулятор
    const calc = () => {
        const calcBlock = document.querySelector('.eight-excel'),
              userQtySelect = calcBlock.querySelector('select'),
              periodInputs = calcBlock.querySelectorAll('input'),
              totalPrice = calcBlock.querySelector('#total-price'),
              priceTable = {
                  0: 1000,
                  1: 1900,
                  2: 2700,
                  3: 4500,
                  4: 6000,
                  5: 8000,
                  6: 10000
              };

        //рассчет
        const countSum = () => {
            const userPriceQty = priceTable[userQtySelect.options.selectedIndex];
            let startTotal = +totalPrice.textContent;
            let selectedPeriod = +[...periodInputs].filter((input) => {
                return input.checked;
            })[0].value.slice(0,2).trim();

            selectedPeriod = selectedPeriod == 12 ? selectedPeriod * 0.9 : selectedPeriod;

            let total = userPriceQty * selectedPeriod;

            totalPrice.textContent = total;
        };

        calcBlock.addEventListener('change', (evt) => {
            if(evt.target.matches('select, input')) {
                countSum();
            }
        });
    };

    calc();

    //слайдер-карусель
    const carousel = () => {
        const carousel = document.getElementById('carousel'),
              carouselContainer = carousel.querySelector('.carousel-container'),
              slider = carouselContainer.querySelector('.sl'),
              leftArr = carousel.querySelector('#carousel_left'),
              rightArr = carousel.querySelector('#carousel_right');    

        let step = 0;
        slider.style['margin-left'] = `${step}px`;

        //проверка смещения
        const checkSlide = () => {
            if(step <= -160) {leftArr.classList.remove('d-none');}
            else {leftArr.classList.add('d-none');}

            if(step <= -960) {rightArr.classList.add('d-none');}
            else {rightArr.classList.remove('d-none');}
        };

        const nextElem = () => {
            step -= 160;
            checkSlide();
            slider.style['margin-left'] = `${step}px`;
        };

        const prevElem = () => {
            step += 160;
            checkSlide();
            slider.style['margin-left'] = `${step}px`;
        };

        //слушатели
        carousel.addEventListener('click', (evt) => {
            evt.preventDefault();

            if(!evt.target.matches('.slider__control')) {return;}

            if(evt.target.matches('#carousel_right')) {nextElem();
            } else if(evt.target.matches('#carousel_left')) {prevElem()}            
        });

    };

    carousel();

    //слайдер отзывов
    const reviewSlider = () => {
        const slider = document.querySelector('.sl2'),
              slides = slider.querySelectorAll('.sl2-slide');

        let currentSlide = 0;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
    
        };
    
        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        slider.addEventListener('click', (evt) => {
            evt.preventDefault();

            if(!evt.target.matches('.slider__control')) {return;}

            prevSlide(slides, currentSlide, 'c-hidden');

            if(evt.target.matches('#arr_right')) {currentSlide++;
            } else if(evt.target.matches('#arr_left')) {currentSlide--;}

            if(currentSlide >= slides.length) {currentSlide = 0;}
            if(currentSlide < 0) {currentSlide = slides.length - 1;}

            nextSlide(slides, currentSlide, 'c-hidden');
        });
        
    };

    reviewSlider();

    //аккордеон
    const spoiler = () => {
        const spoiler = document.querySelector('.js-ui-accordion'),
              paragraphs = spoiler.querySelectorAll('p'),
              answersContent = spoiler.querySelectorAll('.answer-content'),
              answers = spoiler.querySelectorAll('.eleven-answer');
        
        paragraphs.forEach((par, i) => {
            par.addEventListener('click', (evt) => {
                if(answersContent[i].style.maxHeight) {
                    answersContent[i].style.maxHeight = null;
                } else {
                    answersContent.forEach((answer, j) => {
                        if(i !== j) {
                            answersContent[j].style.maxHeight = null;
                        }
                    });
                    answersContent[i].style.maxHeight = answers[i].scrollHeight + 'px';   
                }
            });
        });
    };

    spoiler();

    //скрытие лишнего текста
    const readNews = () => {
        const twelve = document.querySelector('#twelve'),
              leftImg = twelve.querySelector('.twelve-news-left > img'),
              rightImg = twelve.querySelector('.twelve-news-right > img'),
              textNewsLeftBlock = twelve.querySelector('.twelve-news-left > p'),
              textNewsRightBlock = twelve.querySelector('.twelve-news-right > p'),
              rightBtn = twelve.querySelector('.twelve-news-right > p > a '),
              leftBtn = twelve.querySelector('.twelve-news-left > p > a '),
              textNewsLeft = textNewsLeftBlock.textContent,
              textNewsRight = textNewsRightBlock.textContent;
        
        textNewsLeftBlock.textContent = textNewsLeft.slice(0, 50) + '...';
        textNewsRightBlock.textContent = textNewsRight.slice(0, 50) + '...';

        const textChange = (image, textNewsBlock, btn, textNews) => {
            image.classList.toggle('d-none');

            if(textNewsBlock.textContent.length > 60) {
                textNewsBlock.textContent = textNews.slice(0, 50) + '...';
            } else {
                textNewsBlock.textContent = textNews;
            }
            
            if(btn.textContent === 'скрыть') {
                btn.textContent = 'читать далее';
            } else {
                btn.textContent = 'скрыть';
            }
        };

        twelve.addEventListener('click', (evt) => {
            if(evt.target.closest('#btn-news-right')) {
                textChange(rightImg, textNewsRightBlock, rightBtn, textNewsRight);
            }

            if(evt.target.closest('#btn-news-left')) {
                textChange(leftImg, textNewsLeftBlock, leftBtn, textNewsLeft);
            }
        });
    };

    readNews();

    //проверка полей и отправка форм
    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так',
              successMessage = `Мы скоро с <span style='color: #f9d21a'>Вами</span> свяжемся!`,
              statusMessageContainer = document.createElement('div'),
              statusMessage = document.createElement('div');
        
        const removeMessage = () => {
                statusMessage.textContent = '';
                statusMessageContainer.remove();
        };
        
        statusMessageContainer.classList.add('loader-container');
        statusMessageContainer.appendChild(statusMessage);
    
        document.body.addEventListener('input', (evt) => {
            if(evt.target.matches('.form-name')) {
                evt.target.value = evt.target.value.replace(/[^а-я ]/gi, '');
            }
    
            if(evt.target.matches('.form-email')) {
                evt.target.value = evt.target.value.replace(/[а-я]/gi, '');
            }
        });
        
        const postDate = (body) => {
            return fetch('./server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
        };

        document.body.addEventListener('submit', (evt) => {
            let target;
    
            if(evt.target.tagName == 'FORM') {
                evt.preventDefault();
                target = evt.target;
    
                const elementsForm = [...target.elements].filter((item) => {
                   return item.tagName !== 'BUTTON' && item.tagName !== 'P';});
                const formData = new FormData(target);
    
                let body = {};
        
                target.appendChild(statusMessageContainer);
                statusMessage.classList.add('loader');
                formData.forEach((val, key) => {body[key] = val;});
                elementsForm.forEach((input) => {input.value = '';});
                
                postDate(body)
                    .then((response) => {
                        if(response.status !== 200) {
                            throw new Error('status network not 200');
                        }
                        statusMessage.classList.remove('loader');
                        statusMessage.classList.add('resultMessage')
                        statusMessage.innerHTML = successMessage;
                    }) 
                    .catch((error) => {
                        statusMessage.classList.remove('loader');
                        statusMessage.classList.add('resultMessage');
                        statusMessage.textContent = errorMessage;
                        console.log(error);
                    });
                
                setTimeout(removeMessage, 4000);
                
            }
        });
    };

    sendForm();

});