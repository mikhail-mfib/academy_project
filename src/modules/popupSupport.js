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

export default popupSupport;