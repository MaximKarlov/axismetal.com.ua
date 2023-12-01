const cartList = document.querySelector('.order_table');
const orderList = cartList.querySelector('tbody');
const userList = document.querySelector('.delivery_table');
const userListInfo = userList.querySelector('tbody');
const toIndex = document.querySelector('#product_item__btn_bay');
const numberOrder = document.querySelector('.nomer_zamovlenia');

let cartToLocal = [];
let userToLocal = [];
let price = 0;
const max = 999999;

const generateTableRow = (title, priceNumber, priceCount) => {
	return ` 
            <tr>
              <td>${title}</td>
              <td>${priceNumber * priceCount} грн </td>
            </tr>
      `;
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

toIndex.addEventListener('click', e => {
	e.preventDefault();
	localStorage.clear();
	location.assign('../index.html');
});

const generateSummRow = price => {
	return ` 
              <td><b>Разом</b></td>
              <td><b>${price} грн <b></td>
            </tr>
      `;
};

const generateUserTable = user => {
	if (user.userInfo === 'FO') {
		return ` 
            <tr>
              <td>${user.delivery}</td>
              <td>${user.village}, ${
			user.deliveryDepartment || user.deliveryAddress
		} </td>
            </tr>
			<tr>
              <td></td>
              <td>${user.user}</td>
            </tr>
			<tr>
              <td></td>
              <td>${user.tel}</td>
            </tr>
			<tr>
              <td></td>
              <td>${user.email}</td>
            </tr>
			<tr>
              <td>${user.payment_method}</td>
              <td></td>
            </tr>
      `;
	} else {
		return ` 
            <tr>
              <td>${user.delivery}</td>
              <td>${user.village}, ${
			user.deliveryDepartment || user.deliveryAddress
		}</td>
            </tr>
			<tr>
              <td></td>
              <td>${user.user}</td>
            </tr>
			<tr>
              <td></td>
              <td>${user.tel}</td>
            </tr>
			<tr>
              <td></td>
              <td>${user.email}</td>
            </tr>
			<tr>
              <td>ЄДРПОУ</td>
              <td>${user.EDRPOY}</td>
            </tr>
			<tr>
              <td>Назва Організації</td>
              <td>${user.nameOrganization}</td>
            </tr>
			<tr>
              <td>контактна особа</td>
              <td>${user.deliveryContact}</td>
            </tr>
			<tr>
              <td>${user.payment_method}</td>
              <td></td>
            </tr>
      `;
	}
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
	if (localStorage.getItem('user')) {
		userToLocal = JSON.parse(localStorage.getItem('user'));
		if (userToLocal) {
			userListInfo.insertAdjacentHTML(
				'beforeend',
				generateUserTable(userToLocal)
			);
		}
	}

  numberOrder.textContent= getRandomInt(max);
	cartToLocal = [];
}

loadLocaleStorage();
