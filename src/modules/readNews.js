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

export default readNews;