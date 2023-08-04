const bodyElement = document.querySelector('body');
const modalWindow = document.querySelector('.backdrop');
const productBtn = document.querySelectorAll(
	'.product_item__btn.product_item__tocart'
);
const CartProductList = document.querySelector('.cart_content__list');
const cart = document.querySelector('.cart');
const cartQuantity = document.querySelector('.cart_quantity');
const fullPrice = document.querySelector('.fullprice');
let cartToLocal = [];
let counter = 1;

let price = 0;

// const randomId = () => {
// 	return (
// 		Math.random().toString(36).substring(2, 15) +
// 		Math.random().toString(36).substring(2, 15)
// 	);
// };

const generateCartProduct = (id, img, alt, title, priceNumber) => {
	return `<li class="cart_item">
				<article class="cart_item__article" data-id="${id}">
						<img class="cart_item__img" src="${img}" alt="${alt}">

							<div class="cart_item__text">
								<h3 class="cart_item__title">${title}</h3>
								<span class="cart_item__price">Ціна:
									<span class="price">${priceNumber}</span> 
									грн</span>
							</div>
							<div class="cart_item__count">Кількість
									<label for="input_count" class="cart_item__label">
										<input class="cart_item__input_count" type="number" name="input_count" min="1" value="1"><br><br>					
									</label>
							</div>
							<button  type="button" class="cart_item__delete" aria-label="Видалити товар" id="btn_f"></button>
				</article>
			</li>`;
};

const priceWitchoutSpaces = str => {
	let norm = str.split(' ');
	norm.splice(2);
	return norm.join('');
	// return str.replace(/\s+/g, ' ');
};

const normalPrice = str => {
	return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const plusFullPrice = currentPrice => {
	return (price += currentPrice);
};

const minusFullPrice = currentPrice => {
	return (price -= currentPrice);
};

const printQuantity = () => {
	let length = CartProductList.children.length;
	cartQuantity.textContent = length;
	length > 0 ? cart.classList.add('active') : cart.classList.remove('active');
};

const printFullPrice = () => {
	fullPrice.textContent = `${normalPrice(price)} грн`;
};

const loadLocaleStorage = () => {
	if (localStorage.getItem('cartList')) {
		cartToLocal = JSON.parse(localStorage.getItem('cartList'));
		if (cartToLocal) {
			cartToLocal.map(({ id, img, alt, title, priceNumber }) => {
				price += Number(priceNumber);
				CartProductList.insertAdjacentHTML(
					'beforeend',
					generateCartProduct(id, img, alt, title, priceNumber)
				);
			});
			printFullPrice();
			cartQuantity.textContent = Number(cartToLocal.length);
		}
	}
};
loadLocaleStorage();

const deleteItem = productParent => {
	let id = productParent.querySelector('.cart_item__article').dataset.id;
	const element = document.querySelector(`.product_item[data-id="${id}"]`);
	const btnElement = element.querySelector('.product_item__tocart');
	btnElement.disabled = false;

	let currentPrice = parseInt(
		priceWitchoutSpaces(productParent.querySelector('.price').textContent)
	);

	price = minusFullPrice(currentPrice);
	printFullPrice(price);
	productParent.remove();
	const search = cartToLocal.filter(el => el.id !== element.dataset.id);
	cartToLocal = search;
	localStorage.setItem('cartList', JSON.stringify(search));
	printQuantity();
	localStorage.setItem('priceFull', price);
	if (cartQuantity.textContent < 1) {
		modalWindow.classList.remove('active');
		bodyElement.classList.remove('dont_scroll');
	}
};

productBtn.forEach(el => {
	el.closest('.product_item').setAttribute('data-id', counter);
	cartToLocal.map(({ id }) => {
		if (el.closest('.product_item').getAttribute('data-id') === id) {
			el.disabled = true;
		}
	});

	el.addEventListener('click', e => {
		let self = e.currentTarget;
		let parent = self.closest('.product_item');
		const id = parent.dataset.id;
		const count = Number(cartQuantity.textContent);
		const img = parent.querySelector('.product_item__img').getAttribute('src');
		const alt = parent.querySelector('.product_item__img').getAttribute('alt');
		const title = parent.querySelector('.product_item__name').textContent;

		const priceNumber = parseInt(
			priceWitchoutSpaces(
				parent.querySelector('.product_item__pString').textContent
			)
		);

		price = plusFullPrice(priceNumber);

		printFullPrice(price);

		CartProductList.insertAdjacentHTML(
			'beforeend',
			generateCartProduct(id, img, alt, title, priceNumber)
		);
		cartToLocal.push({ id, img, alt, title, priceNumber });
		self.disabled = true;
		printQuantity();
		modalWindow.classList.add('active');
		bodyElement.classList.add('dont_scroll');
		localStorage.setItem('cartList', JSON.stringify(cartToLocal));
	});
	counter += 1;
});

CartProductList.addEventListener('click', e => {
	if (e.target.classList.contains('cart_item__delete'))
		deleteItem(e.target.closest('.cart_item'));
});

CartProductList.addEventListener('change', e => {
	if (e.target.nodeName === 'INPUT') {
		price = 0;
		const productList = CartProductList.querySelectorAll('.cart_item');
		productList.forEach(el => {
			const Price = el.querySelector('.price');
			const Count = el.querySelector('.cart_item__input_count');
			price += Count.value * Number(Price.textContent);
			printFullPrice(price);
			localStorage.setItem('priceFull', price);
		});
	}
});
