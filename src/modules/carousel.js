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

export default carousel;