let cartToLocal = [];
let price = 0;

const generateTableRow = (id, img, alt, title, priceNumber, priceCount) => {
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
