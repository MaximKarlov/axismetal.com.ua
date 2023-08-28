const cartQuantity = document.querySelector('.cart_quantity');
const CartProductList = document.querySelector('.cart_content__list');
const bodyElement = document.querySelector('body');
const modalWindow = document.querySelector('.backdrop');
const btnDecrement = document.querySelector('#button_decrement');
const btnIncrement = document.querySelector('#button_increment');
const detailsCount = document.querySelector('#input_count');
const btnBay = document.querySelector('#product_item__btn_bay');
const productId = document.querySelector('#id_to__bay');
const productName = document.querySelector('#product_name');
const productPrice = document.querySelector('#price_id__toBay');
const productCount = document.querySelector('#input_count');
const productImg = document.querySelector('#photo_to__bay');
const fullPrice = document.querySelector('.fullprice');

let cartToLocal = [];
let counter = 1;

let price = 0;

if (Number(detailsCount.value) === 1) btnDecrement.disabled = true;

const generateCartProduct = (id, img, title, priceNumber, count) => {
	return `<li class="cart_item">
				<article class="cart_item__article" data-id="${id}">
						<img class="cart_item__img" src="${img}" alt="${title}">

							<div class="cart_item__text">
								<h3 class="cart_item__title">${title}</h3>
								<span class="cart_item__price">Ціна:
									<span class="price">${priceNumber}</span> 
									грн</span>
							</div>
							<div class="cart_item__count">Кількість
									<label for="input_count" class="cart_item__label">
										<input class="cart_item__input_count" type="number" name="input_count" min="1" value="${count}"><br><br>					
									</label>
							</div>
							<button  type="button" class="cart_item__delete" aria-label="Видалити товар" id="btn_f"></button>
				</article>
			</li>`;
};

const printQuantity = () => {
	let length = CartProductList.children.length;
	cartQuantity.textContent = length;
	length > 0 ? cart.classList.add('active') : cart.classList.remove('active');
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

const printFullPrice = () => {
	fullPrice.textContent = `${normalPrice(price)} грн`;
};

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

const priceWitchoutSpaces = str => {
	let norm = str.split(' ');
	norm.splice(2);
	return norm.join('');
	// return str.replace(/\s+/g, ' ');
};

const idWitchoutSpaces = str => {
	let norm = str.split(' ');
	norm.splice(0, 1);
	return norm.join('');
	// return str.replace(/\s+/g, ' ');
};

const loadLocaleStorage = () => {
	if (localStorage.getItem('cartList')) {
		cartToLocal = JSON.parse(localStorage.getItem('cartList'));
		cartToLocal.map(({ id, img, alt, title, priceNumber, priceCount }) => {
			if (id === idWitchoutSpaces(productId.textContent));
			price += Number(priceNumber) * priceCount;
			btnBay.disabled = true;
		});
		console.log(price);
		printFullPrice();
		cartQuantity.textContent = Number(cartToLocal.length);
	}
};
loadLocaleStorage();

// const detailsCartProduct = (
// 	productId,
// 	productImg,
// 	productName,
// 	productPrice,
// 	productCount
// ) => {
// 	return `<li class="cart_item">
// 				<article class="cart_item__article" data-id="${productId}">
// 						<img class="cart_item__img" src="${productImg}" alt="${productName}">

// 							<div class="cart_item__text">
// 								<h3 class="cart_item__title">${productName}</h3>
// 								<span class="cart_item__price">Ціна:
// 									<span class="price">${productPrice}</span>
// 									грн</span>
// 							</div>
// 							<div class="cart_item__count">Кількість
// 									<label for="input_count" class="cart_item__label">
// 										<input class="cart_item__input_count" type="number" name="input_count" min="1" value="${productCount}"><br><br>
// 									</label>
// 							</div>
// 							<button  type="button" class="cart_item__delete" aria-label="Видалити товар" id="btn_f"></button>
// 				</article>
// 			</li>`;
// };

btnIncrement.addEventListener('click', e => {
	e.preventDefault();
	detailsCount.value = Number(detailsCount.value) + 1;
	if (Number(detailsCount.value) > 1) btnDecrement.disabled = false;
});

btnDecrement.addEventListener('click', e => {
	e.preventDefault();
	detailsCount.value = Number(detailsCount.value) - 1;
	if (Number(detailsCount.value) === 1) btnDecrement.disabled = true;
});

CartProductList.addEventListener('click', e => {
	if (e.target.classList.contains('cart_item__delete'))
		deleteItem(e.target.closest('.cart_item'));
});

btnBay.addEventListener('click', e => {
	e.preventDefault();
	const product_Img = productImg.getAttribute('src');
	const product_Name = productName.textContent;
	const product_Count = productCount.value;
	const product_Price = priceWitchoutSpaces(productPrice.textContent);
	const product_Id = idWitchoutSpaces(productId.textContent);
	price = product_Price * product_Count;

	cartToLocal.push({
		id: product_Id,
		img: product_Img.slice(1),
		alt: product_Name,
		title: product_Name,
		priceNumber: product_Price,
		priceCount: product_Count,
	});

	localStorage.setItem('cartList', JSON.stringify(cartToLocal));
	cartQuantity.textContent = Number(cartToLocal.length);
	CartProductList.insertAdjacentHTML(
		'beforeend',
		generateCartProduct(
			product_Id,
			product_Img,
			product_Name,
			product_Price,
			product_Count
		)
	);
	modalWindow.classList.add('active');
	bodyElement.classList.add('dont_scroll');
	btnBay.disabled = true;
	printFullPrice(price);
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
