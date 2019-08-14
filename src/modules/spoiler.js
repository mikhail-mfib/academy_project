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

export default spoiler;