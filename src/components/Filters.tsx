import { FC, useEffect, useState } from 'react';
import wasteBin from '../assets/img/waste-bin.svg';
import arrowDown from '../assets/img/big-arrow-down.svg';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { ISingleItem } from '../models/ISingleItem';
import { itemsFiltered } from '../store/reducers/itemsSlice';

const Filters: FC = () => {
    const dispatch = useAppDispatch();
    const [manufacturerFilter, setManufacturerFilter] = useState<ISingleItem[]>([]);
    const [priceFilter, setPriceFilter] = useState<ISingleItem[]>([]);
    const [showFiltered, setShowFiltered] = useState<ISingleItem[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);

    const items = useAppSelector((state) => state.items.items);
    const filteredItems = useAppSelector((state) => state.items.filteredItems);

    useEffect(() => {
        dispatch(itemsFiltered(manufacturerFilter));
    }, [manufacturerFilter]);

    useEffect(() => {
        dispatch(itemsFiltered(priceFilter));
    }, [priceFilter]);

    useEffect(() => {
        dispatch(itemsFiltered(showFiltered));
    }, [showFiltered]);


    //const iterated = filteredItems.length === 0 ? items : filteredItems;

    const handlePriceFilter = () => {
        const priceIterated = manufacturerFilter.length !== 0 
            ? manufacturerFilter 
            : filteredItems.length !== 0 
                ? filteredItems 
                : items;
        const filteredByPrice = priceIterated.filter((item) => {
            return item.price > minPrice && item.price < maxPrice;
        })
        setPriceFilter(filteredByPrice)
        //setManufacturerFilter([...new Set([...manufacturerFilter, ...filteredByPrice])]);
    }

    const handleCheckBoxFilter = (e: any) => {
        const { value, checked } : { value: string; checked: boolean } = e.target;
        if (checked) {
            const matchedItems = items.filter((item) => item.manufacturer === value);
            setManufacturerFilter(matchedItems ? [...manufacturerFilter, ...matchedItems] : manufacturerFilter);
        } else {
            setManufacturerFilter(manufacturerFilter.filter((item) => item.manufacturer !== value));
        }
    }

    const handleRemoveFilters = () => {
        setManufacturerFilter([]);
        setSearchQuery('');
        setMinPrice(0);
        setMaxPrice(10000);
    }

    const handleInputFocused = (e: any) => {
        e.target.value = '';
    }

    const uniqueListOfManufacturers: Array<string> = [...new Set(items.map((item) => item.manufacturer))];

    const searchedManufacturers = uniqueListOfManufacturers.filter((filteredItem) => (
        filteredItem.toLowerCase().includes(searchQuery.toLowerCase())
    ))
    const filteredManufacturers = manufacturerFilter.map((el) => el.manufacturer);
    const combinedSearch = [...new Set([...filteredManufacturers, ...searchedManufacturers])];

    const renderCheckboxList = (listOfFilteredValues: Array<string>) => {
        return (
            listOfFilteredValues.map((value, index) => (
                <li className='list-unmarked' key={value}>
                    <input 
                        type="checkbox"
                        value={value}
                        id={String(index)}
                        onChange={handleCheckBoxFilter}/>
                    <label htmlFor={String(index)}>{value}</label>
                </li>
            ))
        )
    };

    const careCategories = useAppSelector((state) => state.items.typesOfCare);

    const handleCategoryFilter = (e: any, itemsToFilter: ISingleItem[]): void => {
        const id = e.target.dataset.id;
        const matched = document.querySelectorAll(`div[data-id=${id}]`);
        matched.forEach((item) => item.classList.toggle('activated'));
        const activeCareTypes = document.querySelectorAll('.activated');
        const uniqueCareTypes = new Set();
        activeCareTypes.forEach((type) => uniqueCareTypes.add(type.textContent));
        const filtered = itemsToFilter.filter((item) => item.care && [...uniqueCareTypes].length !== 0 && item.care.includes([...uniqueCareTypes].join('/')));
        console.log('categoryFilter:', filtered)
        dispatch(itemsFiltered(filtered));
    }

    const renderLeftFilter = () => {
        return (
            <div className='filter-left-list'>
                <span>ТИП УХОДА</span>
                {careCategories.map((category, index) =>
                    <div 
                        className='list-el'
                        key={index} 
                        data-id={category.identifier}
                        onClick={(e) => handleCategoryFilter(e, items)}
                    >
                    {category.type}          
                    </div>
                )}
            </div>
        )
    }

    const handleShowManufacturers = (e: any) => {
        e.target.classList.toggle('manufacturer-list-expanded');
        const id = e.target.dataset.id;
        const manufacturersList = document.getElementById(id);
        manufacturersList?.classList.toggle('manufacturer-hidden');
    }

    const handleShowParamsSet = (e: any): void => {
        e.target.classList.toggle('filter-parameters-header-expanded');
        const id = e.target.dataset.id;
        const paramsSet = document.getElementById(id);
        paramsSet?.classList.toggle('filter-parameters-hidden');
    }


    return (
        <aside className='filter-left'>
            <div className='filter-parameters'>
                <div className='filter-parameters-header'>
                    <h3>ПОДБОР ПО ПАРАМЕТРАМ</h3>
                    <img className='filter-parameters-opener'  src={arrowDown} alt="<Большая стрелка вниз" data-id='parameter-set' onClick={handleShowParamsSet} />
                </div>
                
                <div className='filter-parameters-content filter-parameters-hidden' id='parameter-set'>
                    <div className='filter-parameters-price'>
                        <span>Цена ₽</span>
                        <form id='price-filter' action="">
                            <input 
                                type="number"
                                value={minPrice}
                                onChange={(e) => setMinPrice(Number(e.target.value))}
                                onFocus={handleInputFocused}
                                onBlur={handlePriceFilter}
                            />
                            <span>-</span>
                            <input 
                                type="number"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                onFocus={handleInputFocused}
                                onBlur={handlePriceFilter}
                            />
                        </form>
                    </div>
                    <div className='filter-parameters-manufacturer'>
                        <h3>Производитель</h3>
                        <form id='manufacturer-filter' action="" className='filter set-search'>
                            <input
                                className='filter-search-field'
                                type="text"
                                placeholder='Поиск...'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <ul className='filter-checkbox manufacturer-hidden' id='manufacturers'>
                                {renderCheckboxList(searchQuery ? combinedSearch : uniqueListOfManufacturers)}
                            </ul>
                            <div className="btn-show" data-id='manufacturers' onClick={handleShowManufacturers}>Показать все</div>
                        </form>
                    </div>
                    <div className='filtered-control'>
                        <div className='btn btn-show-filtered' onClick={() => setShowFiltered(filteredItems)}>
                            <p>Показать</p>
                        </div>
                        <div onClick={handleRemoveFilters}>
                            <img src={wasteBin} alt="Мусорная корзина" />
                        </div>
                    </div>
                </div>
            </div>
            {renderLeftFilter()}
        </aside>
    )
};

export default Filters;