import { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import boxIcon from '../assets/img/box.svg';
import bottleIcon from '../assets/img/bottle.svg';
import addToCart from '../assets/img/add-to-cart.svg';
import shareIcon from '../assets/img/share.svg';
import downloadIcon from '../assets/img/download-dark.svg';
import arrowLeft from '../assets/img/arrow-left-cello.svg';
import horizontalLine from '../assets/img/line.svg'
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { loadItems, onAddToCartClick } from '../store/reducers/ActionCreators';
import { Link } from 'react-router-dom';

const ItemPage: FC = () => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const [itemCount, setItemCount] = useState(1);

    useEffect(() => {
        dispatch(loadItems())
    }, []);
    
    const { barcode } = useParams();
    
    const allItems = useAppSelector(state => state.items.items);
    const selectedItem = allItems.find((item) => item.barcode === Number(barcode))

    const incrementCount = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setItemCount(itemCount + 1);
    }

    const decrementCount = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setItemCount(itemCount !== 1 ? (itemCount - 1) : itemCount);
    }

    const paramsHandler = (e: any) => {
        e.target.classList.toggle('expanded');
        const id = e.target.dataset.id;

        const params = document.getElementById(id);
        params?.classList.toggle('hidden')
    };

    const descrHandler = (e: any) => {
        e.target.classList.toggle('expanded');
        const id = e.target.dataset.id;
        const ul = document.getElementById(id);
        const descr = document.querySelector('.item-description');
        descr?.classList.toggle('description-hidden');
        ul?.classList.toggle('list-hidden');
    };

    return ( 
        selectedItem
        ? <div className='item-page'>
            <div className='container'>
                <div className='itempage-content'>
                    <div className='breadcrumbs-nav-wrapper'>
                        <Link to='/' className='breadcrumbs-mobile link-plain'>
                            <img className='btn-back' src={arrowLeft} alt="Стрелка назад" />
                            <span>Назад</span>
                        </Link>
                        <ul className='breadcrumbs-nav'>
                            <Link to='/' className="breadcrumbs-nav-link link-plain">Главная</Link>
                            <Link to='/' className="breadcrumbs-nav-link link-plain">Каталог</Link>
                            <Link to={pathname} className="breadcrumbs-nav-link link-plain active">{selectedItem.brand} {selectedItem.name}</Link>
                        </ul>
                    </div>
                    <div className='itempage-wrapper'>
                        <div className='block-left'>
                            <img src={selectedItem.image} alt="Изображение товара" />
                        </div>
                        <div className='block-right'>
                            <p className='item-in-stock'>В наличии</p>
                            <div className='item-header'>
                                <p><span>{selectedItem.brand} </span>{selectedItem.name}</p>
                            </div>
                            <div className='item-weight'>
                                <img src={selectedItem?.format === 'мл' ? bottleIcon : boxIcon} alt="Иконка бутылки или коробки" />
                                <span>{selectedItem.size} {selectedItem.format}</span>
                            </div>
                            <div className='item-control'>
                                <form action="" id='form-controlling' >
                                    <span className='item-price'>{
                                        (selectedItem.price ? (selectedItem.price * itemCount) : selectedItem.price).toFixed(2)
                                    } ₽</span>
                                    <div className='quantity-control'>
                                        <button 
                                            className='btn-subtract-amount' 
                                            onClick={decrementCount}>-</button>
                                        <span>{itemCount}</span>
                                        <button 
                                            className='btn-add-amount'
                                            onClick={incrementCount}>+</button>
                                    </div>
                                    <div className='btn btn-cart' onClick={() => onAddToCartClick(selectedItem, dispatch, itemCount)}>
                                        <p>В корзину</p>
                                        <img src={addToCart} alt="Логотип корзины" />
                                    </div>
                                </form>
                            </div>
                            <div className='item-share'>
                                <div className='share'>
                                    <img src={shareIcon} alt="Иконка 'поделиться'" />
                                </div>
                                <div className='offer'>
                                    <p>При покупке от <span>10 000 ₽</span> бесплатная доставка по Кокчетаву и области</p>
                                </div>
                                <div className='pricelist-dark'>
                                    <p>Прайс-лист</p>
                                    <img src={downloadIcon} alt="Логотип скачивания" />
                                </div>
                            </div>
                            <div className='item-data'>
                                <ul id='description' className='data-list'>
                                    <li className='list-unmarked'>Производитель: <span>{selectedItem.manufacturer}</span></li>
                                    <li className='list-unmarked'>Бренд: <span>{selectedItem.brand}</span></li>
                                    <li className='list-unmarked'>Артикул: <span>{460404}</span></li>
                                    <li className='list-unmarked'>Тип ухода: <span>{selectedItem.care}</span></li>
                                    <li className='list-unmarked'>Кол-во в коробке: <span>1</span></li>
                                    <li className='list-unmarked'>Штрихкод: <span>{selectedItem.barcode}</span></li>
                                    <li className='list-unmarked'>Размеры коробки<span className='size-abbreviation'>(Д*Ш*В)</span>: <span></span></li>
                                    <li className='list-unmarked'>Вес коробки: <span>{selectedItem.size} {selectedItem.format}</span></li>
                                </ul>
                            </div>
                            <div className="show-description" data-id='description' onClick={descrHandler}>Описание</div>
                            <img className='show-line' src={horizontalLine} alt="Горизонтальная линия" />
                            <div className='item-description description-hidden'>
                                <p>{selectedItem?.description}</p>
                            </div>
                            <div className="show-parameters" data-id='params' onClick={paramsHandler}>Характеристики</div>
                            <div className='item-data'>
                                <ul id='params' className='parameters-list hidden'>
                                    <li className='list-unmarked'>Назначение: <span>{selectedItem.brand}</span></li>
                                    <li className='list-unmarked'>Тип: <span>{selectedItem.brand}</span></li>
                                    <li className='list-unmarked'>Производитель: <span>{selectedItem.manufacturer}</span></li>
                                    <li className='list-unmarked'>Бренд: <span>{selectedItem.brand}</span></li>
                                    <li className='list-unmarked'>Артикул: <span>4604049097548</span></li>
                                    <li className='list-unmarked'>Штрихкод: <span>{selectedItem.barcode}</span></li>
                                    <li className='list-unmarked'>Вес: <span>{selectedItem.size} {selectedItem.format}</span></li>
                                    <li className='list-unmarked'>Объем: <span>{selectedItem.size} {selectedItem.format}</span></li>
                                    <li className='list-unmarked'>Кол-во в коробке: <span>1</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        : null
    )
};

export default ItemPage;