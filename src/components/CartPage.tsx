/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FC, useEffect, useState } from 'react';
import wasteBin from '../assets/img/waste-bin.svg';
import bottleIcon from '../assets/img/bottle.svg';
import boxIcon from '../assets/img/box.svg';
import arrowLeft from '../assets/img/arrow-left-cello.svg';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  itemAmountAdded,
  itemAmountSubtracted,
  itemDeletedFromCart,
  totalSumCounted,
} from '../store/reducers/cartSlice';
import { ICartItem } from '../models/ICartItem';
import { Link, useLocation } from 'react-router-dom';
import Modal from './ModalOrderProcessed';

const CartPage: FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [active, setActive] = useState(false);

  const cartItems = useAppSelector((state) => state.cart.addedItems);

  const totalSum = cartItems.reduce((acc, currentItem) => {
    return acc + currentItem.price * currentItem.addedAmount;
  }, 0);

  useEffect(() => {
    dispatch(totalSumCounted(totalSum));
  }, [totalSum, cartItems]);

  const handleSubtractItem = (id: number, addedAmount: number) => {
    if (addedAmount === 0) {
      return;
    } else {
      dispatch(itemAmountSubtracted(id));
    }
  };

  const handleAddItem = (id: number) => {
    dispatch(itemAmountAdded(id));
  };

  const handleDeleteItem = (id: number) => {
    const itemsLeftInCart = cartItems.filter((item) => item.id !== id);
    dispatch(itemDeletedFromCart(itemsLeftInCart));
  };

  const handleProcessOrder = () => {
    if (cartItems.length === 0) {
      return;
    }
    setActive(true);
    localStorage.removeItem('cartItems');
    dispatch(itemDeletedFromCart([]));
  };

  const renderCartContent = (item: ICartItem, index: number) => {
    return (
      <div className="cart-item" key={index}>
        <div className="item-image">
          <img src={item.image} alt="Картинка товара" />
        </div>
        <div className="item-main">
          <div className="item-weight">
            <img
              src={item.format === 'мл' ? bottleIcon : boxIcon}
              alt="Иконка бутылки или коробки"
            />
            <span>
              {item.size} {item.format}
            </span>
          </div>
          <Link to={`/${item.barcode}`} style={{ textDecoration: 'none' }}>
            <h2>
              {item.brand} {item.name}
            </h2>
          </Link>
          <p>{item.description}</p>
        </div>
        <div className="quantity-control">
          <button
            className="btn-subtract-amount"
            onClick={() => handleSubtractItem(item.id, item.addedAmount)}
          >
            -
          </button>
          <span>{item.addedAmount}</span>
          <button
            className="btn-add-amount"
            onClick={() => handleAddItem(item.id)}
          >
            +
          </button>
        </div>
        <span className="item-price">
          {(item.price * item.addedAmount).toFixed(2)} ₽
        </span>
        <div className="item-remove" onClick={() => handleDeleteItem(item.id)}>
          <img src={wasteBin} alt="Иконка мусорной корзины" />
        </div>
      </div>
    );
  };

  return (
    <div className="cart-section">
      <div className="container">
        <div className="cart-content">
          <div className="breadcrumbs-nav-wrapper">
            <Link to="/" className="breadcrumbs-mobile link-plain">
              <img className="btn-back" src={arrowLeft} alt="Стрелка назад" />
              <span>Назад</span>
            </Link>
            <ul className="breadcrumbs-nav">
              <Link to="/" className="breadcrumbs-nav-link link-plain">
                Главная
              </Link>
              <Link
                to={pathname}
                className="breadcrumbs-nav-link link-plain active"
              >
                Корзина
              </Link>
            </ul>
          </div>
          <div className="cart-header">
            <div className="header-text">Корзина</div>
          </div>
          <div className="cart-items-wrapper">
            {cartItems.map((item, index) => renderCartContent(item, index))}
          </div>
          <div className="order-process">
            <div
              className="btn btn-process"
              onClick={handleProcessOrder}
              role="button"
            >
              <p>Оформить заказ</p>
            </div>
            <span className="item-price sum">{totalSum.toFixed(2)} ₽</span>
          </div>
        </div>
      </div>
      <Modal active={active} setActive={setActive} />
    </div>
  );
};

export default CartPage;
