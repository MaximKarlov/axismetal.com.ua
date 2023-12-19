<footer id="footer" class="margin-top-60">
    <div class="content">

      <div class="block-5-items">
        <div class="block-items-wrapper">

          <div>
            <div class="header-logo">
              <div><img src="../../img/logo.png"></div>
            </div>
            <br>© 1996-2022
            <br>Axis Metal
            <br>
            <!-- <br><span class="text-small">Lorem ipsum dolor sit amet, consectetur, adipisicing elit. Voluptatum, nesciunt.</span><br> -->

          </div>
          <div>

          </div>
          <div>
            <div class="title title-top">
              <a href="../../ru/o-kompanii.html#1">Оплата и доставка</a>
            </div>
            <div class="title">
              <a href="../../ru/usloviya-oplaty-i-dostavki.html">Условия оплаты и доставки</a>
            </div>

          </div>
          <div>
            <div class="title title-top">
              <a href="../../ru/o-kompanii.html#1">Кто мы</a>
            </div>
            <div class="title">
              <a href="../../ru/o-kompanii.html">О компании</a>
            </div>
            <hr>
            <div class="title">
              <a href="../../ru/contacts.html">Контакты</a>
            </div>
            <hr>
            <div class="title">
              <a href="../../ru/vakansii.html">Вакансии</a>
            </div>
            <hr>

          </div>

          <div itemscope="" itemtype="http://schema.org/Organization">

            <span class="text-size-16"><a href="tel:+380 97 918 62 26" class="a-tel">+380 97 918 62 26</a></span><br>
            <span class="text-size-16"><a href="tel:+380 93 573 02 46" class="a-tel">+380 93 573 02 46</a></span>
            <span class="text-size-16"><a href="mailto:axismetal@ukr.net" class="a-tel">axismetal@ukr.net</a></span>
            <br>
            <br><a type="button" data-toggle="modal" data-target="#feedbackFormModal"
              class="button-square button-square-solid openform" data-form-id="3">Заказать звонок</a>
            <br>
            <br>
            <div itemprop="address" itemscope="" itemtype="http://schema.org/PostalAddress"><span
                itemprop="addressLocality">Украина</span>, <span itemprop="streetAddress">ул. Анатолия Соловьяненко, 68,
                Козин, Киевская область</span></div>
            <!-- <div class="online-pay margin-top-20"><span class="text-small">Мы в соцсетях:</span>
              <br>
              <a href="#1"><img style="margin: 3px;" src="../img/social-fb.png" alt="" class="widht-40"></a>
              <a href="#1"><img style="margin: 3px;" src="../img/social-insta.png" alt="" class="widht-40"></a>
            </div> -->
          </div>
        </div>
      </div>

    </div>
  </footer>

    <!-- Форма обратной связи в модальном окне -->
    <div class="modal" id="feedbackFormModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" style="margin-top: 15px !important" id="myModalLabel">
                        Форма обратной связи
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- Форма обратной связи -->
                    <form id="feedbackForm" action="https://axismetal.com.ua/common/tgram.php" method="post">
                        <div class="form-row">
                            <div class="col-sm-6">
                                <!-- Имя пользователя -->
                                <div class="form-group">
                                    <label for="name" class="control-label">Имя</label>
                                    <input id="name" type="text" name="name" class="form-control" value=""
                                        placeholder="Введите имя" required />
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <!-- Email пользователя -->
                                <div class="form-group">
                                    <label for="phone" class="control-label">Телефон</label>
                                    <input id="phone" type="tel" name="phone" class="form-control" value=""
                                        placeholder="+38 (0__) ___-__-__" required />
                                </div>
                            </div>
                        </div>
                        <!-- Сообщение пользователя -->
                        <!-- <div class="form-group">
                        <label for="message" class="control-label">Сообщение</label>
                        <textarea id="message" type="message" name="message" class="form-control" rows="3" placeholder="Сообщение" ></textarea>
                        </div> -->

                        <!-- Кнопка для отправки формы disabled="disabled"-->

                        <input class="btn btn-success button-dialogwidget CKFormTrigger" value="Оставить заявку"
                            type="submit" name="submityes" />
                    </form>
                    <!-- Сообщение об успешной отправке формы -->
                </div>
            </div>
        </div>
    </div>