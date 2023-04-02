import { useEffect, FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { ISingleItem } from '../models/ISingleItem';
import { loadItems, onAddToCartClick } from '../store/reducers/ActionCreators';
import bottleIcon from '../assets/img/bottle.svg'
import boxIcon from '../assets/img/box.svg';
import addItem from '../assets/img/add-to-cart.svg';
import arrowLeft from '../assets/img/arrow-left-cello.svg';

import Filters from './Filters';
import Pagination from './Pagination';
import { itemsFiltered } from '../store/reducers/itemsSlice';

const MainCatalogue: FC = () => {
    const dispatch = useAppDispatch();

    const items = useAppSelector((state) => state.items.items);
    const filteredItems = useAppSelector((state) => state.items.filteredItems);
    const rendered = filteredItems.length === 0 ? items : filteredItems;

    const [sortedItems, setSortedItems] = useState<ISingleItem[]>([]);

    useEffect(() => {
        setSortedItems([]);
    }, [rendered])

    useEffect(() => {
        dispatch(loadItems());
    }, []);


    const renderItem = (element: ISingleItem) => {
        return (
            <div key={element.id} className='item-card'>
                <div className='item-card-img'>
                    <img src={element.image} alt="Изображение товара" />
                </div>
                <div className='item-weight'>
                    <img src={element.format === 'мл' ? bottleIcon : boxIcon} alt="Логотип бутылки или коробки" />
                    <span>{element.size} {element.format}</span>
                </div>
                <Link to={`/${element.barcode}`} style={{textDecoration: 'none'}}>
                    <p><span>{element.brand}</span> {element.name}</p>
                </Link>
                
                <div className='item-data'>
                    <ul id='description' className='data-list'>
                        <li className='list-unmarked'>Штрихкод: <span>{element.barcode}</span></li>
                        <li className='list-unmarked'>Производитель: <span>{element.manufacturer}</span></li>
                        <li className='list-unmarked'>Бренд: <span>{element.brand}</span></li>
                        <li className='list-unmarked'>Тип ухода: <span>{element.care}</span></li>
                    </ul>
                </div>
                <div className='item-cost'>
                    <span>{element.price.toFixed(2)} ₽</span>
                    <div className='btn btn-cart' onClick={() => onAddToCartClick(element, dispatch)}>
                        <p>В КОРЗИНУ</p>
                        <img src={addItem} alt="Логотип корзины" />
                    </div>
                </div>
            </div>
        )
    };

    const handleItemsSorting = (e: any) => {
        const sortingResult = [...rendered];
        
        switch(e.target.value) {
            case 'price-ascending':
                sortingResult.sort((a, b) => a.price - b.price);
                break;
            case 'price-descending':
                sortingResult.sort((a, b) => b.price - a.price);
                break;
            case 'name-ascending':
                sortingResult.sort((a, b) => {
                    return a.name.toUpperCase() > b.name.toUpperCase() 
                        ? 1 
                        : b.name.toUpperCase() > a.name.toUpperCase() 
                        ? -1 : 0;
                });
                break;
            case 'name-descending':
                sortingResult.sort((a, b) => {
                    return b.name.toUpperCase() > a.name.toUpperCase() 
                        ? 1 
                        : a.name.toUpperCase() > b.name.toUpperCase() 
                        ? -1 : 0;
                });
                break;
            default:
                break;
        }
        setSortedItems(sortingResult)
    }

    const careCategories = useAppSelector((state) => state.items.typesOfCare);

    const handleCategoryFilter = (e: any) => {
        const id = e.target.dataset.id;
        const matched = document.querySelectorAll(`div[data-id=${id}]`);
        matched.forEach((item) => item.classList.toggle('activated'));
        const activeCareTypes = document.querySelectorAll('.activated');
        const uniqueCareTypes = new Set();
        activeCareTypes.forEach((type) => uniqueCareTypes.add(type.textContent));
        const filtered = itemsToRender.filter((item) => item.care && [...uniqueCareTypes].join('/').includes(item.care));
        dispatch(itemsFiltered(filtered));

    }

    const renderTopFilter = () => {
        return (
            <div className='filter-top-grid' onClick={handleCategoryFilter}>
                {careCategories.map((category, index) =>
                    <div 
                        className='grid-el'
                        key={index} 
                        data-id={category.identifier}
                    >
                    {category.type}          
                    </div>
                )}
            </div>
        )
    }

    const itemsToRender = [...new Set([...sortedItems, ...rendered])];

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const paginatedItems = itemsToRender.slice(firstItemIndex, lastItemIndex);
    const currentSetOfItems = paginatedItems.length === 0 ? itemsToRender : paginatedItems;

    const numOfPages = Math.ceil(itemsToRender.length / itemsPerPage);

    return (
        <div className='catalogue'>
            <div className='container'>
                <div className='catalogue-content'>
                    <div className='breadcrumbs-nav-wrapper'>
                        <Link to='/' className='breadcrumbs-mobile link-plain'>
                            <img className='btn-back' src={arrowLeft} alt="Стрелка назад" />
                            <span>Назад</span>
                        </Link>
                        <ul className='breadcrumbs-nav'>
                            <Link to='/' className='breadcrumbs-nav-link link-plain'>Главная</Link>
                            <Link to='/' className='breadcrumbs-nav-link link-plain active'>Косметика и гигиена</Link>
                        </ul>
                    </div>
                    <div className='catalogue-header'>
                        <div className='header-text'>Косметика и гигиена</div>
                        <form action="" id='form-sorting' className='desktop'>
                            <span>Сортировка:</span>
                            <select name="sorting" id="sort-filter" defaultValue="name-ascending" onChange={handleItemsSorting}>
                                <option value="price-ascending">Цена &uarr;</option>
                                <option value="price-descending">Цена &darr;</option>
                                <option value="name-ascending">Название &uarr;</option>
                                <option value="name-descending">Название &darr;</option>
                            </select>
                        </form>
                    </div>
                    <div className='catalogue-grid'>
                        {renderTopFilter()}
                        <div className='catalogue-main'>
                            <Filters />

                            <form action="" id='form-sorting' className='mobile'>
                                <span>Сортировка:</span>
                                <select name="sorting" id="sort-filter" defaultValue="name-ascending" onChange={handleItemsSorting}>
                                    <option value="price-ascending">Цена &uarr;</option>
                                    <option value="price-descending">Цена &darr;</option>
                                    <option value="name-ascending">Название &uarr;</option>
                                    <option value="name-descending">Название &darr;</option>
                                </select>
                            </form>

                            <div className='grid-container'>
                                <div className='items-grid'>
                                    {currentSetOfItems.map((item) => renderItem(item))}
                                </div>
                                <Pagination 
                                    numOfPages={numOfPages}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                />
                            </div>

                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    )
};

export default MainCatalogue;