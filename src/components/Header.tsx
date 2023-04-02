/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import navIcon from "../assets/img/nav-icon.svg";
import mailIcon from '../assets/img/mail-icon.svg';
import sultanLogo from '../assets/img/sultan-logo.svg';
import operatorIcon from '../assets/img/operator.png';
import downloadIcon from '../assets/img/download.svg';
import cartLogo from '../assets/img/cart.svg';
import menu from '../assets/img/menu.svg';
import menuClose from '../assets/img/menu-cross.svg';
import magnifyingGlass from '../assets/img/magn-glass.svg';
import verticalLine from '../assets/img/vertical-line.svg';
import ModalMenu from './ModalMenu';

const Header: FC = () => {
    const itemsInCart = useAppSelector((state) => state.cart.totalInCart);
    const cartAmount = useAppSelector((state) => state.cart.totalSum);


    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuOpen = (e: any) => {
        setMenuOpen(true);
        e.target.classList.toggle('visible');
        const closeBtn = document.querySelector('.img-menu-close');
        closeBtn?.classList.toggle('visible');
    }

    const handleMenuClose = (e: any) => {
        setMenuOpen(false);
        e.target.classList.toggle('visible');
        const menuBtn = document.querySelector('.img-menu');
        menuBtn?.classList.toggle('visible');
    }

    return (
        <header className='header-section'>
            
            <div className='container'>
                <div className='header-nav-top'>
                    <div className='col'>
                        <div className='col-left'>
                            <img className='img-navi' src={navIcon} alt="Иконка навигации" />
                            <p>г. Кокчетав, ул. Ж. Ташенова 129Б<br />
                            <span>(Рынок Восточный)</span></p>
                            <img className='img-mail' src={mailIcon} alt="Иконка конверта" />
                            <p>opt.sultan@mail.ru<br />
                            <span>На связи в любое время</span></p>
                        </div>
                        
                        <ul className='col-right'>
                            <li><a className='link-plain' href="#">О компании</a></li>
                            <li><a className='link-plain' href="#">Доставка и оплата</a></li>
                            <li><a className='link-plain' href="#">Возврат</a></li>
                            <li><a className='link-plain' href="#">Контакты</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr />
            <div className='container'>
                <nav className='header-nav-bottom'>
                    <img src={menu} alt="Меню" className='img-menu visible' onClick={handleMenuOpen}/>
                    <img src={menuClose} alt="Закрыть меню" className='img-menu-close' onClick={handleMenuClose}/>

                    <img className='img-logo' src={sultanLogo} alt="Иконка султана" />
                    <Link to='/' className='btn btn-catalogue'>
                        <p>Каталог</p>
                        <svg className='catalogue-icon' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.5 2C0.5 1.17157 1.17157 0.5 2 0.5H6C6.27614 0.5 6.5 0.723858 6.5 1V6C6.5 6.27614 6.27614 6.5 6 6.5H1C0.723858 6.5 0.5 6.27614 0.5 6V2Z" stroke="white"/>
                            <path d="M8.5 1C8.5 0.723858 8.72386 0.5 9 0.5H13C13.8284 0.5 14.5 1.17157 14.5 2V6C14.5 6.27614 14.2761 6.5 14 6.5H9C8.72386 6.5 8.5 6.27614 8.5 6V1Z" stroke="white"/>
                            <path d="M8.5 9C8.5 8.72386 8.72386 8.5 9 8.5H14C14.2761 8.5 14.5 8.72386 14.5 9V13C14.5 13.8284 13.8284 14.5 13 14.5H9C8.72386 14.5 8.5 14.2761 8.5 14V9Z" stroke="white"/>
                            <path d="M0.5 9C0.5 8.72386 0.723858 8.5 1 8.5H6C6.27614 8.5 6.5 8.72386 6.5 9V14C6.5 14.2761 6.27614 14.5 6 14.5H2C1.17157 14.5 0.5 13.8284 0.5 13V9Z" stroke="white"/>
                        </svg>

                    </Link>
                    <img className='vertical-line' src={verticalLine} alt="" />
                    <div className='search'>
                        <img src={magnifyingGlass} alt="Лупа" />
                        <input className='search-field' placeholder='Поиск...' />
                    </div>
                    <div className='contacts'>
                        <div className='contacts-text'>
                            <span>+7 (777) 490-00-91</span>
                            <span>время работы: 9:00-20:00</span>
                            <a href='#'>Заказать звонок</a>
                        </div>
                        <img src={operatorIcon} alt="Фото оператора" />
                    </div>
                    <div className='pricelist'>
                        <div className='btn btn-prices'>
                            <p>Прайс-лист</p>
                            <img src={downloadIcon} alt="Логотип скачивания" />
                        </div>
                    </div>
                    <Link style={{textDecoration: 'none'}} to='cart' className='cart'>
                        <div className='cart-img-wrapper'>
                            <img src={cartLogo} alt="Иконка корзины" />
                            <div className='cart-circle-wrapper'>
                                <svg width="22" height="22" viewBox="0 0 28 28" fill="white" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="14" cy="14" r="12.5" fill="#FFC85E" stroke="white" strokeWidth="3"/>
                                    <text y="19" x='10' fontSize="14" fontWeight="700">{itemsInCart}</text>
                                </svg>

                            </div>
                        </div>
                        <div className='cart-text'>
                            <span>Корзина</span>
                            <span>{Number(cartAmount).toFixed(2)} ₽</span>
                        </div>
                    </Link>              
                </nav>
            </div>
            <hr />
        <ModalMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </header>
        
        
    )
};

export default Header;
