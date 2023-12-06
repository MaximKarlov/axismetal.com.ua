import { sendEmail } from '../js/email.js';
const body = document.querySelector('body');
const cartList = document.querySelector('.order_table');
const orderList = cartList.querySelector('#orderList');
const userList = document.querySelector('.delivery_table');
const userListInfo = userList.querySelector('tbody');
const toIndex = document.querySelector('#product_item__btn_bay');
const numberOrder = document.querySelector('.nomer_zamovlenia');
const sumPrice = document.querySelector('.sumPrice');
const cart = document.querySelector('.cart');
const cartText = cart.querySelector('.cart_text');
const cartQuantity = cart.querySelector('.cart_quantity');
const versionLang = document.querySelector('.versionRu');

let cartToLocal = [];
let userToLocal = [];
let price = 0;

if (Number(cartQuantity.textContent) === 0) {
    cart.style.pointerEvents = 'none';
}

const generateTableRow = (title, priceNumber, priceCount) => {
    return ` 
            <tr>
              <td>${title}</td>
              <td>${priceNumber * priceCount} грн </td>
            </tr>
      `;
};

toIndex.addEventListener('click', (e) => {
    e.preventDefault();
    //     if (versionLang != null) location.assign('../../ru/index.html');
    //     else location.assign('../index.html');
});

const generateUserTable = (user) => {
    if (user.userInfo === 'FO') {
        return ` 
		<tr>
              <td>${user.delivery}</td>
              <td>${user.village}, ${user.deliveryDepartment || user.deliveryAddress} </td>
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
              <td>${user.village}, ${user.deliveryDepartment || user.deliveryAddress}</td>
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
                orderList.insertAdjacentHTML('afterend', generateTableRow(title, priceNumber, priceCount));
            });
        }
        sumPrice.textContent = price + ' грн';
    }
    if (localStorage.getItem('user')) {
        userToLocal = JSON.parse(localStorage.getItem('user'));
        if (userToLocal) {
            userListInfo.insertAdjacentHTML('beforeend', generateUserTable(userToLocal));
            numberOrder.textContent = userToLocal.orderId;
        }
    }

    //   sendEmail(userToLocal, cartToLocal);
    cartToLocal = [];
}

body.addEventListener('mousedown', (e) => {
    if (e.target.nodeName === 'A') localStorage.clear();
});

loadLocaleStorage();
