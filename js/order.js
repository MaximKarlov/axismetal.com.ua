
const fopBtn = document.querySelector('#fop');
const jyrikBtn = document.querySelector('#jyrik');
const toHide = document.querySelectorAll('.toHide');
const toHideDepartment = document.querySelector('.toHideDepartment');
const toHideDelivery = document.querySelector('.toHideDelivery');
const selectDelivery = document.querySelector('#select_delivery');
const CartProductList = document.querySelector('.order_content__list');
const cartQuantity = document.querySelector('.cart_quantity');
const fullPrice = document.querySelector('.order_fullprice');
const form = document.querySelector('.order_contacts__data');
const paymentMethod = document.querySelector('[name="payment_method"]');
const onSubmitBtn = document.querySelector('.onSubmitBtn');

let cartToLocal = [];
let price = 0;
const max = 999999;


function getRandomInt(max) {
	return Math.floor(Math.random() * max);
  }

onSubmitBtn.classList.add('disabled');

let userInfo = [];

let user = {};

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

selectDelivery.addEventListener('change', (e) => {
    switch (selectDelivery.value) {
        case 'Нова пошта':
            toHideDepartment.classList.remove('unvisibled');
            toHideDelivery.classList.add('unvisibled');
            break;
        case 'Адресна доставка':
            toHideDelivery.classList.remove('unvisibled');
            toHideDepartment.classList.add('unvisibled');

            break;
        default:
            toHideDepartment.classList.add('unvisibled');
            toHideDelivery.classList.add('unvisibled');
            break;
    }

});

if (fopBtn.getAttribute('checked') === 'true') {
    toHide.forEach((el) => el.classList.add('unvisibled'));
    userInfo = 'FO';
}

fopBtn.onclick = function () {
    toHide.forEach((el) => el.classList.add('unvisibled'));
    userInfo = 'FO';
};

jyrikBtn.onclick = function () {
    toHide.forEach((el) => el.classList.remove('unvisibled'));
    userInfo = 'Jyrik';
};

const priceWitchoutSpaces = (str) => {
    return str.replace(/\s+/g, ' ');
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

const deleteItem = (productParent) => {
    let id = productParent.querySelector('.order_cart__item_article').dataset.id;
    const element = document.querySelector(`.product_item[data-id="${id}"]`);

    let currentPrice = parseInt(priceWitchoutSpaces(productParent.querySelector('.order_price').textContent));

    price = minusFullPrice(currentPrice);
    productParent.remove();
    const search = cartToLocal.filter((el) => el.id !== id);
    cartToLocal = search;
    localStorage.setItem('cartList', JSON.stringify(search));
    printQuantity();
    printFullPrice();
    localStorage.setItem('priceFull', price);
};

CartProductList.addEventListener('click', (e) => {
    cartToLocal = [];
    if (e.target.classList.contains('order_cart__item_delete')) deleteItem(e.target.closest('.order_cart__item'));

    if (e.target.nodeName === 'INPUT') {
        price = 0;
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

            let normalImg = img.toString().slice(1);
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

paymentMethod.addEventListener('change', (e) => {
    if (e.target.value === 'Онлайн оплата') {
        onSubmitBtn.textContent = 'Оплатити онлайн';
        onSubmitBtn.setAttribute('onClick', `location.href=createOrder('${user.name}','${user.tel}')`);
    } else onSubmitBtn.textContent = 'Підтвердити замовлення';
});

form.addEventListener('change', (e) => {
    let self = e.currentTarget;
    user.name = self.querySelector('[name="contact_lastName"]').value;
    user.tel = self.querySelector('[name="contact_phone"]').value;
    user.email = self.querySelector('[name="contact_email"]').value;

    if (!user.name || !user.email || !user.tel) {
        onSubmitBtn.classList.add('disabled');
    } else {
        onSubmitBtn.classList.remove('disabled');
    }
});

form.addEventListener('submit', async e => {
	e.preventDefault();
	let self = e.currentTarget;
	user.nameOrganization = self.querySelector(
		'[name="contact_nameOrganization"]'
	).value;
	user.EDRPOY = self.querySelector('[name="contact_EDRPOY"]').value;
	user.deliveryContact = self.querySelector(
		'[name="contact_deliveryContact"]'
	).value;
	user.village = self.querySelector('[name="contact_sity"]').value;
	user.delivery = self.querySelector('[name="select_delivery"]').value;
	user.deliveryDepartment = self.querySelector(
		'[name="contact_department"]'
	).value;
	user.deliveryAddress = self.querySelector(
		'[name="contact_deliveryAddress"]'
	).value;
	user.payment_method = self.querySelector('[name="payment_method"]').value;
	user.comment = self.querySelector('[name="contact_comment"]').value;

	const orderId=getRandomInt(max)

	localStorage.setItem(
		'user',
		JSON.stringify({
			userInfo,
			orderId,
			user: user.name,
			email: user.email,
			tel: user.tel,
			village: user.village,
			delivery: user.delivery,
			deliveryDepartment: user.deliveryDepartment,
			deliveryAddress: user.deliveryAddress,
			payment_method: user.payment_method,
			comment: user.comment,
			nameOrganization: user.nameOrganization,
			EDRPOY: user.EDRPOY,
			deliveryContact: user.deliveryContact,
		})
	);
	
	
	if (paymentMethod.value != 'Онлайн оплата') {
		location.assign('succes.html');
		;
	}
});
