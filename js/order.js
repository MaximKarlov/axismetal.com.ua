const fopBtn = document.querySelector('#fop');
const jyrikBtn = document.querySelector('#jyrik');
const toHide = document.querySelectorAll('.toHide');
const CartProductList = document.querySelector('.order_content__list');
const cartQuantity = document.querySelector('.cart_quantity');
const fullPrice = document.querySelector('.order_fullprice');
const form = document.querySelector('.order_contacts__data');
const paymentMethod = document.querySelector('[name="payment_method"]');
const onSubmitBtn = document.querySelector('.onSubmitBtn');

let cartToLocal = [];
let price = 0;

onSubmitBtn.disabled = true;

let user = {
	name,
	email,
	tel,
};

const generateCartProduct = (id, img, alt, title, priceNumber, priceCount) => {
	return `<li class="order_cart__item">
				<article class="order_cart__item_article" data-id="${id}">
						<img class="order_cart__item_img" src=".${img}" alt="${alt}">
							<div class="order_cart__item_text">
								<h3 class="order_cart__item_title">${title}</h3>
								<span class="order_cart__item_price">Ціна:
									<span class="order_price">${priceNumber}</span> 
									грн</span>
							</div>
							<div class="order_cart__item_count">Кількість
									<label for="input_count" class="order_cart__item_label">
										<input class="order_cart__item_input_count" type="number" name="input_count" min="1" value="${priceCount}"><br><br>					
									</label>
							</div>
							<button  type="button" class="order_cart__item_delete" aria-label="Видалити товар" id="btn_f"></button>
				</article>
			</li>`;
};

if (fopBtn.getAttribute('checked') === 'true') {
	toHide.forEach(el => el.classList.add('unvisibled'));
}

fopBtn.onclick = function () {
	toHide.forEach(el => el.classList.add('unvisibled'));
};

jyrikBtn.onclick = function () {
	toHide.forEach(el => el.classList.remove('unvisibled'));
};

const priceWitchoutSpaces = str => {
	return str.replace(/\s+/g, ' ');
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
	// length > 0 ? cart.classList.add('active') : cart.classList.remove('active');
};

const printFullPrice = () => {
	fullPrice.textContent = `${normalPrice(price)} грн`;
};

function loadLocaleStorage() {
	if (localStorage.getItem('cartList')) {
		cartToLocal = JSON.parse(localStorage.getItem('cartList'));
		if (cartToLocal) {
			cartToLocal.map(({ id, img, alt, title, priceNumber, priceCount }) => {
				price += Number(priceNumber * priceCount);
				CartProductList.insertAdjacentHTML(
					'beforeend',
					generateCartProduct(id, img, alt, title, priceNumber, priceCount)
				);
			});
			printFullPrice();
			cartQuantity.textContent = Number(cartToLocal.length);
			localStorage.setItem('priceFull', price);
		}
	}
	cartToLocal = [];
}

loadLocaleStorage();

const deleteItem = productParent => {
	let id = productParent.querySelector('.order_cart__item_article').dataset.id;
	const element = document.querySelector(`.product_item[data-id="${id}"]`);

	let currentPrice = parseInt(
		priceWitchoutSpaces(productParent.querySelector('.order_price').textContent)
	);

	price = minusFullPrice(currentPrice);
	productParent.remove();
	const search = cartToLocal.filter(el => el.id !== id);
	cartToLocal = search;
	localStorage.setItem('cartList', JSON.stringify(search));
	printQuantity();
	printFullPrice();
	localStorage.setItem('priceFull', price);
};

CartProductList.addEventListener('click', e => {
	cartToLocal = [];
	if (e.target.classList.contains('order_cart__item_delete'))
		deleteItem(e.target.closest('.order_cart__item'));

	if (e.target.nodeName === 'INPUT') {
		price = 0;
		const productList = CartProductList.querySelectorAll('.order_cart__item');
		productList.forEach(el => {
			const Price = el.querySelector('.order_price');
			const Count = el.querySelector('.order_cart__item_input_count');
			price += Count.value * Number(Price.textContent);
			printFullPrice(price);
			localStorage.setItem('priceFull', price);
		});
		productList.forEach(product => {
			const id = product.querySelector('.order_cart__item_article').dataset.id;
			const priceCount = product.querySelector(
				'.order_cart__item_input_count'
			).value;
			const img = product
				.querySelector('.order_cart__item_img')
				.getAttribute('src');
			const alt = product
				.querySelector('.order_cart__item_img')
				.getAttribute('alt');
			const title = product.querySelector(
				'.order_cart__item_title'
			).textContent;

			const priceNumber = parseInt(
				priceWitchoutSpaces(product.querySelector('.order_price').textContent)
			);

			let normalImg = img.toString().slice(1);
			console.log(normalImg);
			cartToLocal.push({
				id,
				img: normalImg,
				alt,
				title,
				priceNumber,
				priceCount,
			});
			localStorage.setItem('cartList', JSON.stringify(cartToLocal));
		});
	}
});

paymentMethod.addEventListener('change', e => {
	if (e.target.value === 'ОнлайнОплата') {
		onSubmitBtn.textContent = 'Оплатити онлайн';
		onSubmitBtn.setAttribute(
			'onClick',
			`location.href=createOrder('${user.name}','${user.tel}')`
		);
	} else onSubmitBtn.textContent = 'Підтвердити замовлення';
});

form.addEventListener('change', e => {
	let self = e.currentTarget;
	user.name = self.querySelector('[name="contact_lastName"]').value;
	user.tel = self.querySelector('[name="contact_phone"]').value;
	user.email = self.querySelector('[name="contact_email"]').value;
	if (!user.name || !user.email || !user.tel) {
		onSubmitBtn.disabled = true;
	} else {
		onSubmitBtn.disabled = false;
		localStorage.setItem('user', JSON.stringify({ name, email, tel }));
	}
});

form.addEventListener('submit', e => {
	e.preventDefault();
	let self = e.currentTarget;
	// createOrder(user);
	// let name = self.querySelector('[name="contact_lastName"]').value;
	// let tel = self.querySelector('[name="contact_phone"]').value;
	// let mail = self.querySelector('[name="contact_email"]').value;
	let nameOrganization = self.querySelector(
		'[name="contact_nameOrganization"]'
	).value;
	let EDRPOY = self.querySelector('[name="contact_EDRPOY"]').value;
	let deliveryContact = self.querySelector('[name="contact_deliveryContact"]').value;
	let sity = self.querySelector('[name="contact_sity"]').value;
	let service = self.querySelector('[name="select_delivery"]').value;
	let department = self.querySelector('[name="contact_department"]').value;
	let method = self.querySelector('[name="payment_method"]').value;
	let comment = self.querySelector('[name="contact_comment"]').value;

	emailjs.init('YOwuZ0YbnNXpFf1ZR');

	const templateParams = {
		user: {
			name,
			tel,
			mail,
			nameOrganization,
			EDRPOY,
			deliveryContact,
		},
		delivery: {
			sity,
			service,
			department,
		},

		payment: {
			method,
			comment,
		},

		cartToLocal: JSON.stringify(
			cartToLocal.map(el => {
				return `<br>Назва товару: ${el.title}  Ціна ${el.priceNumber} <br>`;
			})
		),
	};

	console.log(templateParams);
	emailjs.send('service_vxe1rof', 'template_qksdz3v', templateParams).then(
		function (response) {
			console.log('SUCCESS!', response.status, response.text);
		},
		function (error) {
			console.log('FAILED...', error);
		}
	);
});
