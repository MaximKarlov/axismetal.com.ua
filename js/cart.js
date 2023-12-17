import nameProduct from './name.js';
const bodyElement = document.querySelector('body');
const modalWindow = document.querySelector('.backdrop');
const productBtn = document.querySelectorAll('.product_item__btn.product_item__tocart');
const cashClear = document.querySelector('.cash_clear');
const CartProductList = document.querySelector('.cart_content__list');
const cart = document.querySelector('.cart');
const cartText = document.querySelector('.cart_text');
const cartQuantity = document.querySelector('.cart_quantity');
const fullPrice = document.querySelector('.fullprice');
const versionLang = document.querySelector('.versionRu');

let cartToLocal = [];
let counter = 1;
let price = 0;

 if (Number(cartQuantity.textContent) === 0) {
        cart.style.pointerEvents = 'none';
    } else cart.style.pointerEvents = 'auto';

const generateCartProduct = (id, img, alt, title, priceNumber, count) => {
    let titleRu = [];
    let titleUa = [];
    if (versionLang != null) {
        nameProduct.map((el) => {
            if (el.id === id) {
                titleRu.push(el.ruVer);
            }
        });
        return `<li class="order_cart__item">
				<article class="order_cart__item_article" data-id="${id}">
						<img class="order_cart__item_img" src="../${img}" alt="${alt}">
							<div class="order_cart__item_text">
								<h3 class="order_cart__item_title">${titleRu}</h3>
								<span class="order_cart__item_price">Цена:
									<span class="order_price">${priceNumber}</span> 
									грн</span>
							</div>
							<div class="order_cart__item_count">Количество
									<label for="input_count" class="order_cart__item_label">
										<input class="order_cart__item_input_count" type="number" name="input_count" min="1" value="${count}"><br><br>					
									</label>
							</div>
							<button  type="button" class="order_cart__item_delete" aria-label="Видалити товар" id="btn_f"></button>
				</article>
			</li>`;
    } else {
        nameProduct.map((el) => {
            if (el.id === id) titleUa.push(el.ukrVer);
        });
        return `<li class="order_cart__item">
				<article class="order_cart__item_article" data-id="${id}">
						<img class="order_cart__item_img" src="../${img}" alt="${alt}">
							<div class="order_cart__item_text">
								<h3 class="order_cart__item_title">${titleUa}</h3>
								<span class="order_cart__item_price">Ціна:
									<span class="order_price">${priceNumber}</span> 
									грн</span>
							</div>
							<div class="order_cart__item_count">Кількість
									<label for="input_count" class="order_cart__item_label">
										<input class="order_cart__item_input_count" type="number" name="input_count" min="1" value="${count}"><br><br>					
									</label>
							</div>
							<button  type="button" class="order_cart__item_delete" aria-label="Видалити товар" id="btn_f"></button>
				</article>
			</li>`;
    }
};

const priceWitchoutSpaces = (str) => {
    let norm = str.split(' ');
    norm.splice(2);
    return norm.join('');
};

const normalPrice = (str) => {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const plusFullPrice = (currentPrice) => {
    return (price += currentPrice);
};

const minusFullPrice = (currentPrice) => {
    return (price -= currentPrice);
};

const printQuantity = () => {
    let length = CartProductList.children.length;
    cartQuantity.textContent = length;
    length > 0 ? (cart.style.pointerEvents = 'auto') : (cart.style.pointerEvents = 'none');
};

const printFullPrice = () => {
    fullPrice.textContent = `${normalPrice(price)} грн`;
};

const loadLocaleStorage = () => {
    if (localStorage.getItem('cartList')) {
        cartToLocal = JSON.parse(localStorage.getItem('cartList'));
        if (cartToLocal) {
            if (CartProductList) {
                cartToLocal.map(({ id, img, alt, title, priceNumber, priceCount }) => {
                    price += Number(priceNumber);
                    CartProductList.insertAdjacentHTML(
                        'afterbegin',
                        generateCartProduct(id, img, alt, title, priceNumber, priceCount)
                    );
                });
                printFullPrice();
            }
            cartQuantity.textContent = Number(cartToLocal.length);
        }
    }
    if (Number(cartQuantity.textContent) === 0) {
        cart.style.pointerEvents = 'none';
    } else cart.style.pointerEvents = 'auto';
};

loadLocaleStorage();

const deleteItem = (productParent) => {
    let id = productParent.querySelector('.order_cart__item_article').dataset.id;
    const element = document.querySelector(`.product_item[data-id="${id}"]`);
    const btnElement = element.querySelector('.product_item__tocart');
    btnElement.disabled = false;

    let currentPrice = parseInt(priceWitchoutSpaces(productParent.querySelector('.order_price').textContent));

    price = minusFullPrice(currentPrice);
    printFullPrice(price);
    productParent.remove();
    const search = cartToLocal.filter((el) => el.id !== element.dataset.id);
    cartToLocal = search;
    localStorage.setItem('cartList', JSON.stringify(search));
    printQuantity();
    localStorage.setItem('priceFull', price);
    if (cartQuantity.textContent < 1) {
        modalWindow.classList.remove('active');
        bodyElement.classList.remove('dont_scroll');
    }
};

productBtn.forEach((el) => {
    cartToLocal.map(({ id }) => {
        if (el.closest('.product_item').getAttribute('data-id') === id) {
            el.disabled = true;
        }
    });

    el.addEventListener('click', (e) => {
        let self = e.currentTarget;
        let parent = self.closest('.product_item');
        const id = parent.dataset.id;
        const count = Number(cartQuantity.textContent);
        const img = parent.querySelector('.product_item__img').getAttribute('src');
        const alt = parent.querySelector('.product_item__img').getAttribute('alt');
        const title = parent.querySelector('.product_item__name').textContent;

        const priceNumber = parseInt(priceWitchoutSpaces(parent.querySelector('.product_item__pString').textContent));

        price = plusFullPrice(priceNumber);

        printFullPrice(price);

        const priceCount = 1;

        CartProductList.insertAdjacentHTML(
            'afterbegin',
            generateCartProduct(id, img, alt, title, priceNumber, priceCount)
        );
        cartToLocal.push({ id, img, alt, title, priceNumber, priceCount });
        self.disabled = true;
        printQuantity();
        modalWindow.classList.add('active');
        bodyElement.classList.add('dont_scroll');
        localStorage.setItem('cartList', JSON.stringify(cartToLocal));
    });
    counter += 1;
});


CartProductList.addEventListener('click', (e) => {
    if (e.target.classList.contains('order_cart__item_delete')) deleteItem(e.target.closest('.order_cart__item'));

    if (e.target.nodeName === 'INPUT') {
        price = 0;
        cartToLocal = [];
        const productList = CartProductList.querySelectorAll('.order_cart__item');
        productList.forEach((el) => {
            const Price = el.querySelector('.order_price');
            const Count = el.querySelector('.order_cart__item_input_count');
            price += Count.value * Number(Price.textContent);
            printFullPrice(price);
            localStorage.setItem('priceFull', price);
        });

        productList.forEach((product) => {
            const id = product.querySelector('.order_cart__item_article').dataset.id;
            const priceCount = product.querySelector('.order_cart__item_input_count').value;
            const img = product.querySelector('.order_cart__item_img').getAttribute('src');
            const alt = product.querySelector('.order_cart__item_img').getAttribute('alt');
            const title = product.querySelector('.order_cart__item_title').textContent;

            const priceNumber = parseInt(priceWitchoutSpaces(product.querySelector('.order_price').textContent));

            // let normalImg = img.toString().;
            cartToLocal.push({
                id,
                img,
                alt,
                title,
                priceNumber,
                priceCount,
            });
            localStorage.setItem('cartList', JSON.stringify(cartToLocal));
        });
    }
});
