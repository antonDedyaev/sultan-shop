import { FC } from 'react';
import navIcon from "../assets/img/nav-icon.svg";
import mailIcon from '../assets/img/mail-icon.svg';
import phoneSales from '../assets/img/phone-sales.svg';
import phone from '../assets/img/phone.svg';
import downloadIcon from '../assets/img/download.svg';

export interface IModalProps {
    menuOpen: boolean;
    setMenuOpen: (state: boolean) => void;
}

const ModalMenu: FC<IModalProps> = ({ menuOpen, setMenuOpen }) => (
    <div className={menuOpen ? 'modal menu active' : 'modal menu'}>
        <div className={menuOpen ? 'modal-menu-content active' : 'modal-menu-content'}>
            <div className='modal-menu-main'>
                <div className='header-contacts'>
                    <div className='header-contacts-address'>
                        <img className='img-navi' src={navIcon} alt="Иконка навигации" />
                        <div className='spans'>
                            <span>г. Кокчетав, ул. Ж. Ташенова 129Б</span>
                            <span>(Рынок Восточный)</span>
                        </div>

                    </div>
                    <div className='header-contacts-mail'>
                        <img className='img-mail' src={mailIcon} alt="Иконка конверта" />
                        <div className='spans'>
                            <span>opt.sultan@mail.ru</span>
                            <span>На связи в любое время</span>
                        </div>

                    </div>
                    <div className='header-contacts-phone'>
                        <img className='img-mail' src={phoneSales} alt="Иконка трубки" />
                        <div className='spans'>
                            <span>Отдел продаж</span>
                            <span>+7 (777) 490-00-91</span>
                        </div>
                        
                    </div>
                    <div className='header-workhours'>время работы: 9:00-20:00</div>
                    <div className='header-contacts-call'>
                        <img className='img-mail' src={phone} alt="Иконка вызова" />
                        <div className='spans'>
                            <a href='#'>Заказать звонок</a>
                        </div>
                    </div>
                </div>
                <div className='header-menu'>
                    <h3>Меню сайта:</h3>
                    <ul className='list-unmarked header-menu-items'>
                        <li><a className='link-plain' href="#">О компании</a></li>
                        <li><a className='link-plain' href="#">Доставка и оплата</a></li>
                        <li><a className='link-plain' href="#">Возврат</a></li>
                        <li><a className='link-plain' href="#">Контакты</a></li>
                    </ul>
                </div>
                <div className='header-pricelist'>
                    <div className='btn btn-prices'>
                        <p>Прайс-лист</p>
                        <img src={downloadIcon} alt="Логотип скачивания" />
                    </div>
                </div>
                
            </div>

        </div>
    </div>
)

export default ModalMenu;