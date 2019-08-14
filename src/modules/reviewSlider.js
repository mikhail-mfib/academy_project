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

        if(evt.target.matches('.arr_right')) {currentSlide++;
        } else if(evt.target.matches('.arr_left')) {currentSlide--;}

        if(currentSlide >= slides.length) {currentSlide = 0;}
        if(currentSlide < 0) {currentSlide = slides.length - 1;}

        nextSlide(slides, currentSlide, 'c-hidden');
    });
    
};

export default reviewSlider;