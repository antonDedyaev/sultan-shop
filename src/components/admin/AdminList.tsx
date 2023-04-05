import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ISingleItem } from '../../models/ISingleItem';
import { loadItems } from '../../store/reducers/ActionCreators';
import deleteCard from '../../assets/img/close-md-svgrepo-com.svg';
import editCard from '../../assets/img/edit-svgrepo-com.svg';
import addCard from '../../assets/img/add-plus-square-svgrepo-com.svg';
import backToMain from '../../assets/img/back-buttons-multimedia-svgrepo-com.svg';
import { itemsLoaded } from '../../store/reducers/itemsSlice';

const AdminList: FC = () => {
  const dispatch = useAppDispatch();
  const allItems = useAppSelector((state) => state.items.items);

  useEffect(() => {
    dispatch(loadItems());
  }, []);

  const handleRemoveItem = (e: React.MouseEvent<HTMLDivElement>) => {
    const targetId = e.currentTarget.closest('div')?.id;

    const filteredItems = allItems.filter(
      (item) => item.id !== Number(targetId),
    );
    localStorage.setItem('items', JSON.stringify(filteredItems));
    dispatch(itemsLoaded(filteredItems));
  };

  const renderItemList = (item: ISingleItem) => {
    return (
      <div key={item.id} className="item-card relative">
        <div
          className="card-remove"
          id={String(item.id)}
          onClick={handleRemoveItem}
        >
          <img src={deleteCard} alt="Кнопка удаления" />
        </div>
        <Link to={`edit/${item.barcode}`} className="card-edit">
          <img src={editCard} alt="Кнопка редактирования" />
        </Link>
        <div className="item-card-img">
          <img src={item.image} alt="Изображение товара" />
        </div>
        <div className="item-weight">
          <span>
            {item.size} {item.format}
          </span>
        </div>
        <Link to={`/${item.barcode}`} style={{ textDecoration: 'none' }}>
          <p>
            <span>{item.brand}</span> {item.name}
          </p>
        </Link>

        <div className="item-data">
          <ul id="description" className="data-list">
            <li className="list-unmarked">
              Штрихкод: <span>{item.barcode}</span>
            </li>
            <li className="list-unmarked">
              Производитель: <span>{item.manufacturer}</span>
            </li>
            <li className="list-unmarked">
              Бренд: <span>{item.brand}</span>
            </li>
            <li className="list-unmarked">
              Тип ухода: <span>{item.care}</span>
            </li>
          </ul>
        </div>
        <div className="item-cost">
          <span>{item.price.toFixed(2)} ₽</span>
        </div>
      </div>
    );
  };

  return (
    <div className="admin">
      <div className="admin-header">
        <h1>Режим администрирования</h1>
        <Link to="/" className="btn-to-main link-plain">
          <img src={backToMain} alt="Кнопка возврата в меню" />
          <span>Вернуться в каталог</span>
        </Link>
      </div>
      <div className="admin-page">
        <div className="admin-page-grid">
          {allItems.map((item) => renderItemList(item))}
          <div className="item-card card-add empty">
            <Link to="edit/new">
              <img src={addCard} alt="Картинка добавления" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminList;
