import { sendEmail } from '../js/email.js';
import nameProduct from './name.js';
const body = document.querySelector('body');
const cartList = document.querySelector('.order_table');
const orderList = cartList.querySelector('#orderList');
const userList = document.querySelector('.delivery_table');
const userListInfo = userList.querySelector('tbody');
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

const generateTableRow = (id, title, priceNumber, priceCount) => {
    let titleRu = [];
    let titleUa = [];
    if (versionLang != null) {
        nameProduct.map((el) => {
            if (el.id === id) {
                titleRu.push(el.ruVer);
            }
        });
        return ` 
            <tr>
              <td>${titleRu}</td>
              <td>${priceNumber * priceCount} грн </td>
            </tr>
      `;
    } else {
        nameProduct.map((el) => {
            if (el.id === id) titleUa.push(el.ukrVer);
        });
        return ` 
            <tr>
              <td>${titleUa}</td>
              <td>${priceNumber * priceCount} грн </td>
            </tr>
      `;
    }
};

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
            cartToLocal.map(({ title, priceNumber, priceCount, id }) => {
                price += Number(priceNumber * priceCount);
                orderList.insertAdjacentHTML('afterend', generateTableRow(id, title, priceNumber, priceCount));
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

    // sendEmail(userToLocal, cartToLocal);
    cartToLocal = [];
}

body.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('toIndexHTML')) localStorage.clear();
});

loadLocaleStorage();
