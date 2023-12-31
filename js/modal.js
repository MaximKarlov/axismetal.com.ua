const modalWindow = document.querySelector('.backdrop');
const modalWindowClose = document.querySelector('.closeBtn');
const cartBtn = document.querySelector('.cart');
const modalBtnClose = document.querySelector('.modal-btn__close');
const cartQuantity = document.querySelector('.cart_quantity');
const bodyElement = document.querySelector('body');

if (modalBtnClose) {
    modalBtnClose.addEventListener('click', () => {
        modalWindow.classList.remove('active');
        cartBtn.classList.remove('active');
        bodyElement.classList.remove('dont_scroll');
    });
}

if (modalWindowClose) {
    modalWindowClose.addEventListener('click', () => {
        modalWindow.classList.remove('active');
        cartBtn.classList.remove('active');
        bodyElement.classList.remove('dont_scroll');
    });
}
