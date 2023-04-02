/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';

import previousPage from '../assets/img/arrow-prev.svg';
import nextPage from '../assets/img/arrow-next.svg';

interface IPaginationProps {
    numOfPages: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

const Pagination: FC<IPaginationProps> = ({ numOfPages, currentPage, setCurrentPage }) => {
    const pageNumbers: Array<number> = [...Array(numOfPages + 1).keys()].slice(1);

    // if (numOfPages === 1) {
    //     return null;
    // }

    const previousClickHandler = () => {
        if(currentPage !== 1) {
           setCurrentPage(currentPage - 1);
        }

    };
    const nextClickHandler = () => {
        if(currentPage !== numOfPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const pageChangeHandler = (page: number) => {
        setCurrentPage(page);
    };


    return (
        <div className='pagination'>
            <nav className='pagination-nav'>
                <ul className='pagination-list list-unmarked'>
                    <li className='page-item page-prev'>
                        <a className='page-link' onClick={previousClickHandler}>
                            <img src={previousPage} alt="Стрелка влево" />
                        </a>
                    </li>
                    {pageNumbers.map((page) => (
                        <li
                            key={page}
                            className={page === currentPage ? "page-item active" : "page-item"}
                        >
                            <a className="page-link" onClick={() => pageChangeHandler(page)}>
                            {page}
                            </a>
                        </li>
                    ))}
                    <li className='page-item page-next'>
                        <a className="page-link" onClick={nextClickHandler}>
                            <img src={nextPage} alt="Стрелка вправо" />
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
        
    )


};

export default Pagination;