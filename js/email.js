


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

const sendEmail = (user,cartToLocal,userInfo) =>{
	let orderList =[]
	emailjs.init('YOwuZ0YbnNXpFf1ZR');
console.log("user",user);
	cartToLocal.map(el => {
		orderList.push(`<tr><td>${el.title}</td><td>${el.priceCount}</td><td>${el.priceNumber}</td><td>${el.priceNumber*el.priceCount}</td></tr>`);
	})

	const orderListTable=`<table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 45%;"></colgroup>
	<tbody>
	<tr><td>Name</td><td>Count</td><td>Price</td><td>Summ</td></tr>
	${orderList.join("")} </tbody>
	</table>`
	
	const orderUserTable=generateUserTable(user,userInfo);

	console.log("orderUserTable",orderUserTable)

	const templateParams = {
		user: orderUserTable,
        email:user.email,
		order: orderListTable,
        

	};

	emailjs.send('service_vxe1rof', 'template_04gsmqw', templateParams).then(
		function (response) {
			console.log('SUCCESS!', response.status, response.text);
		},
		function (error) {
			console.log('FAILED...', error);
		}
	);
}

export {sendEmail}