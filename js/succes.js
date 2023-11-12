const cartList = document.querySelector('.order_table');
const orderList = cartList.querySelector('tbody');

let cartToLocal = [];
let price = 0;

console.log('orderList:', orderList);

const generateTableRow = (title, priceNumber, priceCount) => {
	return ` 
            <tr>
              <td>${title}</td>
              <td>${priceNumber * priceCount} грн </td>
            </tr>
      `;
};

const generateSummRow = price => {
	return ` 
            <tr>
              <td><b>Разом</b></td>
              <td><b>${price} грн <b></td>
            </tr>
      `;
};

function loadLocaleStorage() {
	if (localStorage.getItem('cartList')) {
		cartToLocal = JSON.parse(localStorage.getItem('cartList'));
		if (cartToLocal) {
			cartToLocal.map(({ title, priceNumber, priceCount }) => {
				price += Number(priceNumber * priceCount);
				orderList.insertAdjacentHTML(
					'beforeend',
					generateTableRow(title, priceNumber, priceCount)
				);
			});
		}
		orderList.insertAdjacentHTML('beforeend', generateSummRow(price));
	}
	console.log('cartToLocal: ', cartToLocal);
	cartToLocal = [];
}

loadLocaleStorage();
