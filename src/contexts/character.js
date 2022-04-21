import React from 'react';
import axios from 'axios';

const CharacterContext = React.createContext();

const CharacterProvider = ({ children }) => {

    const getData = (query) => {

        axios.get(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query}&limit=5&apikey=28a7a1300246b753803b1254a45b216d`)
        .then(res => {
            
        });
    }
    return(
        <CharacterContext.Provider
            value={{

            }}
        >
            {children}
        </CharacterContext.Provider>
    )

}

export {CharacterContext, CharacterProvider}