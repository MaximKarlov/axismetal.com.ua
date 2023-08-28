const cartQuantity = document.querySelector('.cart_quantity');
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

let cartToLocal = [];

if (Number(detailsCount.value) === 1) btnDecrement.disabled = true;

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
		cartToLocal.map(element => {
			if (element.id === idWitchoutSpaces(productId.textContent));
			btnBay.disabled = true;
		});

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

btnBay.addEventListener('click', e => {
	e.preventDefault();
	let productTotalPrice = 0;
	const product_Img = productImg.getAttribute('src');
	const product_Name = productName.textContent;
	const product_Count = productCount.value;
	const product_Price = priceWitchoutSpaces(productPrice.textContent);
	const product_Id = idWitchoutSpaces(productId.textContent);
	console.log(product_Id);

	cartToLocal.push({
		id: product_Id,
		img: product_Img.slice(1),
		alt: product_Name,
		title: product_Name,
		priceNumber: product_Price,
		priceCount: product_Count,
	});
	modalWindow.classList.add('active');
	bodyElement.classList.add('dont_scroll');
	btnBay.disabled = true;
	localStorage.setItem('cartList', JSON.stringify(cartToLocal));
	cartQuantity.textContent = Number(cartToLocal.length);
	// CartProductList.insertAdjacentHTML(
	// 	'beforeend',
	// 	detailsCartProduct(
	// 		productId.textContent,
	// 		productImg.src,
	// 		productName.textContent,
	// 		priceWitchoutSpaces(productPrice.textContent)
	// 	)
	// );
});
