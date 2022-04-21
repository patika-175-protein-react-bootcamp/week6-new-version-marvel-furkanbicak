import React, { useContext, useState } from "react";  
import { DataContext } from "../../contexts/data";

const Pagination = () => {
    
    const [pageNumberLimit] = useState(5);
  	const [currentPage, setCurrentPage] = useState(1);

  	const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  	const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
      
    const pages = [];
    let pageIncrementBtn = null;
    let pageDecrementBtn = null;

    const { getData, items, setLoading, key } = useContext(DataContext);


    const getPageSize = () => {
        if (items)  
            return items.total / 12;
    };

    for (let i = 1; i <= getPageSize(); i++ ) {
        pages.push(i);
    }

    for (let i = 0; i <= Object.keys(sessionStorage).length - 1; i++){
        key.push(Object.keys(sessionStorage)[i]);
    }


    //Paginationdaki numaralı sayfalardan birine yönelendirme.
    const handleClick = (event) => {
        setLoading(prevState => !prevState);
        const { id } = event.target;
        setCurrentPage(Number(id));
        getData(Number(id));
        setLoading(prevState => !prevState);  
    };

    //Pagination kısmını return eden fonksiyon.
    const renderPagesNumbers = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return(
                <li 
                    key			= { number } 
                    id			= { number } 
                    onClick		= { handleClick } 
                    className	= { currentPage == number ? 'active' : null } 
                >
                    { number }
                </li>
            );
        } else {
            return null;
        }
    });

     //Paginationdaki ileri butonun tetiklendiği kısım.
     const handleNextbtn = (newPageNum) => {
        setLoading(prevState => !prevState);
        setCurrentPage(newPageNum);

        if (newPageNum > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
        getData(newPageNum);
        setLoading(prevState => !prevState);
    };

    //Paginationdaki geri butonun tetiklendiği kısım.
    const handlePrevbtn = (newPageNum) => {
        setLoading(prevState => !prevState);
        setCurrentPage(newPageNum);

        if ((currentPage-1) % pageNumberLimit==0) {
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
        getData(newPageNum);
        setLoading(prevState => !prevState);
    };

    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick = { handleNextbtn }> &hellip; </li>;
    }

    if (pages.length >= minPageNumberLimit) {
        pageDecrementBtn = <li onClick = { handlePrevbtn }> &hellip; </li>;
    }
    return(
        <div className='pagination'>
			
                <ul className='pageNumbers'> 
                    <li>
                        <button 
                                onClick = { () => handlePrevbtn(currentPage - 1) } 
                                disabled= { currentPage == pages[0] ? true : false } 
                            > ❮ 
                        </button>
                    </li>
                        { pageDecrementBtn }
                        { renderPagesNumbers } 
                        { pageIncrementBtn }

                    <li>
                        <button onClick = { () => handleNextbtn(currentPage + 1) }> ❯ </button>
                    </li>

                </ul> 
		
        </div>
    )
}

export default Pagination;