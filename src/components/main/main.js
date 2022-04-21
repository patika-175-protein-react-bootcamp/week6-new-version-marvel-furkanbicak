import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../contexts/data';
import Header from '../header/header';
import Pagination from '../pagination/pagination';
import Search from '../search/search';
import './main.css'

const Main = () => {
    const { items, getData } = useContext(DataContext);
    useEffect(() => {
        getData();
    },[]);
    return(
        
       <>
        <Header />
      <Search/>
       
        <div className="contentContainer">
            {
                items && items.results.map((item, index) => (
                    <div 
                            key			=   { index } 
                            className   =   'contentMovie'
                    >
                        <div id="contentImage">

                            <Link to={`${item.id}`}>
                            <img 
                                src = { `${item.thumbnail.path}.${item.thumbnail.extension}` } 
                                alt = "image" 
                            />
                            </Link>
                            
                        </div>
                        <div id="title">
                            <b>
                                <Link to={`${item.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                                        {item.name}
                                </Link>
                            </b>
                        </div>
                    </div>
                ))   
            }
        </div>
        <Pagination />
       </>
        
    )
}

export default Main;