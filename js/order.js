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
const warningField = document.querySelector('.warning');
const versionLang = document.querySelector('.versionRu');

let cartToLocal = [];
let price = 0;
const max = 999999;

const nameProduct = [
    {
        id: '1',
        ukrVer: 'Матриця 400х300mm на напівавтоматичний трейсилер',
        ruVer: 'Матрица 400х300mm на полуавтоматический трейсилер',
    },
    {
        id: '2',
        ukrVer: 'Матриця 430х350mm на напівавтоматичний трейсилер',
        ruVer: 'Матрица 430х350mm на полуавтоматический трейсилер',
    },
    { id: '3', ukrVer: 'Матриця 250х200mm на ручний трейсилер', ruVer: 'Матрица 250х200mm на ручной трейсилер' },
    { id: '4', ukrVer: 'Ніж для трейсилера, круглий', ruVer: 'Нож для трейсилера, круглый' },
    { id: '5', ukrVer: 'Ніж для трейсилера, прямокутний', ruVer: 'Нож для трейсилера, прямоугольный' },
    {
        id: '6',
        ukrVer: 'Тефлонована паяльна плита на термоформер',
        ruVer: 'Тефлонированная паяльная плита на термоформер',
    },
    {
        id: '7',
        ukrVer: "Комплект повздовжньої різки м'якої плівки на термоформер",
        ruVer: 'Комплект продольной резки мягкой пленки на термоформер',
    },
    // { id: '8', ukrVer: '', ruVer: '' },
    {
        id: '8',
        ukrVer: "Комплект поперечної різки м'якої плівки на термоформер",
        ruVer: 'Комплект поперечной резки мягкой пленки на термоформер',
    },
    {
        id: '9',
        ukrVer: "Ніж для поперечної різки м'якої плівки на термоформер",
        ruVer: 'Нож для поперечной резки мягкой пленки на термоформер',
    },
    { id: '10', ukrVer: 'Комплект формовки на термоформер', ruVer: 'Комплект формовки на термоформер' },
    { id: '11', ukrVer: 'Комплект запайки на термоформер ', ruVer: ' Комплект запайки на термоформер' },
    {
        id: '12',
        ukrVer: 'Настільний ручний трейсилер SOLDER MN-1',
        ruVer: 'Настольный ручной трейсилер SOLDER MN-1',
    },
    {
        id: '13',
        ukrVer: 'Підлоговий напівавтоматичний трейсилер LIPOVAK KV620',
        ruVer: 'Напольный полуавтоматический трейсилер LIPOVAK KV620',
    },
    {
        id: '14',
        ukrVer: 'Матриця 412 х 332 мм для термоформера на 4 лотки',
        ruVer: 'Матрица 412 х 332 мм для термоформера на 4 лотка',
    },
];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

onSubmitBtn.classList.add('disabled');

let userInfo = [];

let user = {};

const generateCartProduct = (id, img, alt, title, priceNumber, priceCount) => {
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
						<img class="order_cart__item_img" src=".${img}" alt="${alt}">
							<div class="order_cart__item_text">
								<h3 class="order_cart__item_title">${titleRu}</h3>
								<span class="order_cart__item_price">Цена:
									<span class="order_price">${priceNumber}</span> 
									грн</span>
							</div>
							<div class="order_cart__item_count">Количество
									<label for="input_count" class="order_cart__item_label">
										<input class="order_cart__item_input_count" type="number" name="input_count" min="1" value="${priceCount}"><br><br>					
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
						<img class="order_cart__item_img" src=".${img}" alt="${alt}">
							<div class="order_cart__item_text">
								<h3 class="order_cart__item_title">${titleUa}</h3>
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
    }
};
const selectDeliveryLoad = (value) => {
    switch (value) {
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
};

selectDeliveryLoad(selectDelivery.value);

selectDelivery.addEventListener('change', (e) => {
    selectDeliveryLoad(selectDelivery.value);
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
    } else if (versionLang != null) onSubmitBtn.textContent = 'Подтвердить заказ';
    else onSubmitBtn.textContent = 'Підтвердити замовлення';
});

form.addEventListener('change', (e) => {
    let self = e.currentTarget;
    user.name = self.querySelector('[name="contact_lastName"]').value;
    user.tel = self.querySelector('[name="contact_phone"]').value;
    user.email = self.querySelector('[name="contact_email"]').value;

    if (!user.name || !user.email || !user.tel) {
        onSubmitBtn.classList.add('disabled');
        warningField.classList.remove('unvisibled');
    } else {
        onSubmitBtn.classList.remove('disabled');
        warningField.classList.add('unvisibled');
    }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let self = e.currentTarget;
    user.nameOrganization = self.querySelector('[name="contact_nameOrganization"]').value;
    user.EDRPOY = self.querySelector('[name="contact_EDRPOY"]').value;
    user.deliveryContact = self.querySelector('[name="contact_deliveryContact"]').value;
    user.village = self.querySelector('[name="contact_sity"]').value;
    user.delivery = self.querySelector('[name="select_delivery"]').value;
    user.deliveryDepartment = self.querySelector('[name="contact_department"]').value;
    user.deliveryAddress = self.querySelector('[name="contact_deliveryAddress"]').value;
    user.payment_method = self.querySelector('[name="payment_method"]').value;
    user.comment = self.querySelector('[name="contact_comment"]').value;

    const orderId = getRandomInt(max);

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
        if (versionLang != null) location.replace('succes_ru.html');
        else location.replace('succes.html');
    }
});
