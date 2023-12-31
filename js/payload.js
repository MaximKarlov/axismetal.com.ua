function createOrder(name, tel) {
	// const userLocal = localStorage.getItem('user');
	const button = $ipsp.get('button');
	button.setMerchantId(1528369);
	// button.setMerchantId(1396424);

	button.setAmount(`${localStorage.getItem('priceFull')}`, 'UAH', true);
	button.setResponseUrl('https://axismetal.com.ua/page_pay/succes.html');
	// button.setResponseUrl('succes.html');
	button.setHost('pay.fondy.eu');
	button.addField({
		label: 'ПІБ',
		value: name,
		required: true,
		// readonly: true,
	});
	button.addField({
		label: 'Номер телефону',
		value: tel,
		// readonly: true,
		required: true,
	});
	button.addField({
		label: 'Опис платіжки',
		name: 'description',
		value: 'Оплата за товар',
		readonly: true,
	});
	return button.getUrl();
}
