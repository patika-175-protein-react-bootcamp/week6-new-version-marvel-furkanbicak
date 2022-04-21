import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import './search.css'

const Search = () => {
    const [characters, setCharacters] = useState([]);
    const [input, setInput] = useState('');

    const onChange = (query) => {
        setInput(query.target.value);
 
        axios.get(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query.target.value}&limit=5&apikey=28a7a1300246b753803b1254a45b216d
        `)
        .then(res => {
            setCharacters(res.data.data.results)
            //console.log("first", res.data.data.results);
        })
    }

    const details = (detailCode) => {
        axios.get(`https://gateway.marvel.com:443/v1/public/characters/${detailCode}?apikey=28a7a1300246b753803b1254a45b216d`)
            .then(res => {
                console.log("Detay", res.data.data.results)
            })
    }
    return(
 
    
        <div className='search'>
            <label>Karakter Ara</label>
            <input className = 'costum-input' type='text' placeholder='Arama Yap' onChange={onChange} />

            {
                characters.length > 0  && input.length > 0 ?
                    <div className='search_dropdown'>
                    {
                        characters.map((item, index) => {
                            return(
                                <button key={index} onClick={() => details(item.id)} >
                                    <Link to={`${item.id}`} >
                                        {item.name}
                                    </Link>
                                </button>
                            )
                        })
                    }
                    </div> : null
            }
             {characters.length < 1 && input.length > 0 && (
            <div >
                <p className='search_dropdown'>{'Aradığın şeyi şuan bulamadık...'}</p>
            </div>
      )}
                

         
        </div>
    )
  
}

export default Search;