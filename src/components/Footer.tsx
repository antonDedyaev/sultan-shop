import React, { FC } from 'react';
import sultanLogoWhite from '../assets/img/sultan-logo-white.svg';
import downloadIcon from '../assets/img/download.svg';
import whatsappLogo from '../assets/img/whatsapp.svg';
import telegramLogo from '../assets/img/telegram.svg';
import visaLogo from '../assets/img/visa.png';
import mastercardLogo from '../assets/img/mastercard.png';
import arrowRight from '../assets/img/arrow-right.svg';

const Footer: FC = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-menu menu-1">
            <img
              className="sultan-logo"
              src={sultanLogoWhite}
              alt="Белый логотип бренда"
            />
            <p>
              Компания «Султан» — снабжаем
              <br /> розничные магазины товарами
              <br /> "под ключ" в Кокчетаве и Акмолинской
              <br /> области
            </p>
            <span>Подпишись на скидки и акции</span>
            <div className="email">
              <input className="email-field" placeholder="Введите ваш E-mail" />
              <img
                className="email-search-icon"
                src={arrowRight}
                alt="Стрелка вправо"
              />
            </div>
          </div>
          <div className="footer-menu menu-2">
            <h3>Меню сайта:</h3>
            <nav className="nav-bottom">
              <ul className="list-unmarked">
                <li className="list-item">
                  <a className="link-plain" href="#">
                    О компании
                  </a>
                </li>
                <li className="list-item">
                  <a className="link-plain" href="#">
                    Доставка и оплата
                  </a>
                </li>
                <li className="list-item">
                  <a className="link-plain" href="#">
                    Возврат
                  </a>
                </li>
                <li className="list-item">
                  <a className="link-plain" href="#">
                    Контакты
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="footer-menu menu-3">
            <h3>Категории:</h3>
            <nav className="nav-bottom">
              <ul className="list-unmarked">
                <li className="list-item">
                  <a className="link-plain" href="#">
                    Бытовая химия
                  </a>
                </li>
                <li className="list-item">
                  <a className="link-plain" href="#">
                    Косметика и гигиена
                  </a>
                </li>
                <li className="list-item">
                  <a className="link-plain" href="#">
                    Товары для дома
                  </a>
                </li>
                <li className="list-item">
                  <a className="link-plain" href="#">
                    Товары для детей и мам
                  </a>
                </li>
                <li className="list-item">
                  <a className="link-plain" href="#">
                    Посуда
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="footer-menu menu-4">
            <h3>Скачать прайс-лист:</h3>
            <div className="btn btn-prices btn-bottom">
              <p>Прайс-лист</p>
              <img src={downloadIcon} alt="Логотип скачивания" />
            </div>
            <span>Связь в мессенджерах:</span>
            <div className="social-logos">
              <img src={whatsappLogo} alt="Логотип Whatsapp" />
              <img src={telegramLogo} alt="Логотип Telegram" />
            </div>
          </div>
          <div className="footer-menu menu-5">
            <h3>Контакты:</h3>
            <div className="contacts-text contacts-bottom">
              <span>+7 (777) 490-00-91</span>
              <span>время работы: 9:00-20:00</span>
              <a href="#">Заказать звонок</a>
            </div>
            <div className="contacts-mail">
              <p>
                opt.sultan@mail.ru
                <br />
                <span>На связи в любое время</span>
              </p>
            </div>
            <div className="payment-cards">
              <img src={visaLogo} alt="Логотип Visa" />
              <img src={mastercardLogo} alt="Логотип MasterCard" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
