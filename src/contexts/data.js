import React, { useState } from 'react';
import axios from 'axios';

const DataContext = React.createContext();

const DataProvider = ({ children }) => {
    const [items, setItems] = useState(null);
    const [loading, setLoading] = useState(false);
    let key = [];

    const getData = (param) => {
        
        if (!param) {
            param = 1;
        }
        const sessionResult = key.filter(e => e == param);
    
        if (sessionResult[0]) {
            let data = JSON.parse(sessionStorage.getItem(`${param}`)); 
            setItems(data);
            setLoading(prevState => !prevState);
        } else {
            axios.get(`http://gateway.marvel.com/v1/public/characters?ts=1&apikey=28a7a1300246b753803b1254a45b216d&hash=3962d34abe1e2d95e7e41885568fc386&offset=${ (param - 1) * 12 }&limit=12`)
                .then(res => {
                    sessionStorage.setItem(`${param}`, JSON.stringify(res.data.data));
                    setItems(res.data.data);
                });
            setLoading(prevState => !prevState);	
        }    
    };
    return(
        <DataContext.Provider
            value={{
                getData,
                items,
                loading,
                setLoading,
                key
            }}
        >
            {children}
        </DataContext.Provider>
    )

}

export {DataContext, DataProvider}