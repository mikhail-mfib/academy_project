const toggleMiniMenu = () => {
    const target = document.getElementById('main'),
          miniMenu = target.querySelector('.two-mini'),
          observerConfig = {attributes: true};

    const observer = new MutationObserver(() => {
        miniMenu.classList.toggle('d-none');
    });

    observer.observe(target, observerConfig);
};

export default toggleMiniMenu;