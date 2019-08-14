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

export default popupOffer;