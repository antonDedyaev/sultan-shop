import { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { itemEdited } from '../../store/reducers/itemsSlice';

import backBtn from '../../assets/img/back-buttons-multimedia-svgrepo-com.svg';
import { ISingleItem } from '../../models/ISingleItem';
import { generateID } from '../../utils/generateID';

const AdminEditCard: FC = () => {
  const { barcode } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const allItems = useAppSelector((state) => state.items.items);

  useEffect(() => {
    console.log('fetchedItems:', allItems);
    localStorage.setItem('items', JSON.stringify(allItems));
  }, [allItems, dispatch]);

  const blankCard: ISingleItem = {
    id: generateID(20, 100),
    image: 'https://hdseller.ru/image/catalog/1dasd/notfound.png',
    name: '',
    format: 'мл',
    size: 0,
    barcode: 0,
    manufacturer: '',
    brand: '',
    description: '',
    price: 0.0,
    care: '',
  };

  const matchedCard = allItems.find((item) => item.barcode === Number(barcode));
  const selectedCard: ISingleItem = matchedCard ? matchedCard : blankCard;

  const handleSaveData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fields = formData.entries();

    const clone: any = Object.assign({}, selectedCard);

    let careValue = '';

    for (const [key, value] of fields) {
      if (key === 'care') {
        careValue += `/${value}`;
        clone[key] = careValue.slice(1);
        continue;
      }
      console.log(typeof key);
      clone[key] =
        typeof selectedCard[key as keyof ISingleItem] === 'number'
          ? Number(value)
          : value;
    }
    dispatch(itemEdited(clone));
    navigate(-1);
  };

  const handleSelectedOptions = ({
    currentTarget,
  }: React.FocusEvent<HTMLSelectElement>) => {
    currentTarget.multiple = true;
    currentTarget.size = 11;
  };

  return (
    <div className="card-edit-page">
      <div className="admin-header">
        <h1>Редактирование товара</h1>
        <Link to="/" className="btn-to-main link-plain">
          <img src={backBtn} alt="Кнопка возврата" />
          <span>В каталог</span>
        </Link>
        <Link to="/admin" className="btn-to-main link-plain">
          <img src={backBtn} alt="Кнопка возврата" />
          <span>На страницу администрирования</span>
        </Link>
      </div>
      <form id="card-form" action="" name="item-card" onSubmit={handleSaveData}>
        <div className="card-data">
          <div className="card-form-labels">
            <label htmlFor="item-id">ID:</label>
            <label htmlFor="item-img">Изображение:</label>
            <label htmlFor="item-name">Наименование:</label>
            <label htmlFor="item-size-format">Тип размера:</label>
            <label htmlFor="item-size">Объем:</label>
            <label htmlFor="item-barcode">Штрихкод:</label>
            <label htmlFor="item-manufacturer">Производитель:</label>
            <label htmlFor="item-brand">Бренд:</label>
            <label htmlFor="item-description">Описание:</label>
            <label htmlFor="item-price">Цена:</label>
            <label htmlFor="care-type">Тип ухода</label>
          </div>
          <div className="card-form-inputs">
            <input
              type="number"
              name="id"
              id="item-id"
              defaultValue={String(selectedCard.id)}
            />
            <input
              type="text"
              name="image"
              id="item-img"
              defaultValue={String(selectedCard?.image)}
            />
            <input
              type="text"
              name="name"
              id="item-name"
              defaultValue={String(selectedCard?.name)}
            />
            <input
              type="text"
              name="format"
              id="item-size-format"
              defaultValue={String(selectedCard?.format)}
            />
            <input
              type="number"
              name="size"
              id="item-size"
              defaultValue={String(selectedCard?.size)}
            />
            <input
              type="number"
              name="barcode"
              id="item-barcode"
              defaultValue={String(selectedCard?.barcode)}
            />
            <input
              type="text"
              name="manufacturer"
              id="item-manufacturer"
              defaultValue={String(selectedCard?.manufacturer)}
            />
            <input
              type="text"
              name="brand"
              id="item-brand"
              defaultValue={String(selectedCard?.brand)}
            />
            <input
              type="text"
              name="description"
              id="item-description"
              defaultValue={String(selectedCard?.description)}
            />
            <input
              type="number"
              name="price"
              id="item-price"
              defaultValue={String(selectedCard?.price)}
            />
            <select name="care" id="care-type" onFocus={handleSelectedOptions}>
              <option value="Уход за телом">Уход за телом</option>
              <option value="Уход за руками">Уход за руками</option>
              <option value="Уход за ногами">Уход за ногами</option>
              <option value="Уход за лицом">Уход за лицом</option>
              <option value="Уход за волосами">Уход за волосами</option>
              <option value="Средства для загара">Средства для загара</option>
              <option value="Средства для бритья">Средства для бритья</option>
              <option value="Подарочные наборы">Подарочные наборы</option>
              <option value="Гигиеническая продукция">
                Гигиеническая продукция
              </option>
              <option value="Гигиена полости рта">Гигиена полости рта</option>
              <option value="Бумажная продукция">Бумажная продукция</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn-save">
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default AdminEditCard;
