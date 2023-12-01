const PUBLICKEY = 'YOwuZ0YbnNXpFf1ZR';
const SERVICEID = 'service_vxe1rof';
const TEMPLATEID = 'template_04gsmqw';


const generateUserTable = (user,userInfo) => {
	if (userInfo === 'FO') {
		return ` <table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 45%;"></colgroup>
        <tbody>
            <tr>
              <td>${user.delivery}</td>
              <td>${user.village}, ${
			user.deliveryDepartment || user.deliveryAddress
		} </td>
            </tr>
			<tr>
              <td></td>
              <td>${user.name}</td>
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
            </tr></tbody></table>
      `;
	} else {
		return ` <table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 45%;"></colgroup>
        <tbody>
            <tr>
              <td>${user.delivery}</td>
              <td>${user.village}, ${
			user.deliveryDepartment || user.deliveryAddress
		}</td>
            </tr>
			<tr>
              <td></td>
              <td>${user.name}</td>
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
              <td>Контактна особа</td>
              <td>${user.deliveryContact}</td>
            </tr>
			<tr>
              <td>${user.payment_method}</td>
              <td></td>
            </tr></tbody></table>
      `;
	}
};

const sendEmail = (user,cartToLocal,userInfo,orderId) =>{
	let orderList =[]
	emailjs.init(PUBLICKEY);

	cartToLocal.map(el => {
		orderList.push(`<tr><td>${el.title}</td><td>${el.priceCount}</td><td>${el.priceNumber}</td><td>${el.priceNumber*el.priceCount}</td></tr>`);
	})

	const orderListTable=`<table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 45%;"></colgroup>
	<tbody>
	<tr><td>Назва</td><td>Кількість</td><td>Ціна</td><td>Сума</td></tr>
	${orderList.join("")} 
  <tr><td>Разом</td><td> </td><td> </td><td>${localStorage.getItem("priceFull")}</td></tr>
  </tbody>
	</table>`
	
	const orderUserTable=generateUserTable(user,userInfo);

	const templateParams = {
    orderId: orderId,
		user: orderUserTable,
        email:user.email,
		order: orderListTable,
        

	};

	emailjs.send(SERVICEID, TEMPLATEID, templateParams).then(
		function (response) {
			console.log('SUCCESS!', response.status, response.text);
		},
		function (error) {
			console.log('FAILED...', error);
		}
	);
}

export {sendEmail}