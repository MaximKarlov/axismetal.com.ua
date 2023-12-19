<div class="full-width text-white block-call-form-2 block-call-form-bg-default margin-top-30">
	<div class="content">
		<div class="block-call-form-fields text-center margin-top-30">
		<span class="text-size-27">Сделаем просчёт стоимости в реальном времени и<br>подарим скидку на доставку</span>
		
		<div class="text-size-18 text-thin dw-uform-phrase block-mobile-hidden">Оставьте номер телефона и имя прямо сейчас</div>
		<!-- <br><div class="send">Ваша заявка прийнята</div> -->
			<div class="unsend">Заполните все поля</div><br><br>
		<form class="CKiForm" action="common/tgram.php" method="post" target="send_resp">
			<input name="name" class="form-field form-field-name" placeholder="Имя" type="text" required="">
			<input name="phone" class="form-field form-field-phone" placeholder="+38 (0__) ___-__-__" type="phone" pattern="+[0-9]{10}" required="">
			<input class="button-square button-red-solid CKFormTrigger" value="Получить просчет" type="submit"><br><br>
			<!-- <div class="block-form-conf block-mobile-hidden"><br><br>Lorem ipsum dolor sit amet, consectetur adipisicing elit</div> -->
		</form></div>
	</div>
</div>