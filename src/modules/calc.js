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

export default calc;