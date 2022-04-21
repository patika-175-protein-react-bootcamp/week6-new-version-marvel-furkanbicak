import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './detail.css'

const Details = ( ) => {
    const [itemDetail, setItemDetail] = useState([])
    const [comics, setComics] = useState([])
    
    let key = useParams();
    const navigate = useNavigate();


    useEffect(() => {
       details();
       comicDetails();
    },[key]);

    const details = () => {
        axios.get(`https://gateway.marvel.com:443/v1/public/characters/${key.id}?apikey=28a7a1300246b753803b1254a45b216d`)
            .then(res => {
                setItemDetail(res.data.data.results)
            })
    }
    const comicDetails = () => {
        axios.get(`https://gateway.marvel.com:443/v1/public/characters/${key.id}/comics?format=comic&formatType=comic&orderBy=onsaleDate&limit=10&apikey=28a7a1300246b753803b1254a45b216d`)
        .then(res => {
            setComics(res.data.data.results)
        })
    }

    //console.log("Data", itemDetail)
    //console.log("Roman", comics)

    comics.map((item, index) => {
        console.log("Romanlar", item.images)
    })

   
   
    return(
        <div className='detail-main'>

            <div className='detail-main-content'>
                <div className='detail-image'>
                {
                    // itemDetail && !!itemDetail.length && 
                   itemDetail?.map((item) => {
                        return(
                            <img   key={item.id} src = { `${item.thumbnail.path}.${item.thumbnail.extension}` } 
                            alt = "image" 
                    />
                        )
                    })
                }
                </div>

                <div className ='detail-name'>
                    {
                        itemDetail?.map((item) => {
                            return(
                            item.name
                            )
                        })
                    }
                </div>

                <div className ='detail-description'>
                    {
                        itemDetail?.map((item) => {
                            return(
                            item.description
                            )
                        })
                    }
                </div>
            </div>


                <div className ='detail-comic'>
                    <h1>Çizgi Romanlar</h1>
                    {
                        comics?.length > 0 ? (
                            comics?.map((item, index) => {
                                return(
                                    <span key={index}>
                                        {item.title}
                                    </span>
                                    
                                )
                            })
                        ) : (
                            <div>
                                Aradığın şey yok...
                            </div>
                        )
                    }

                    {
                        comics?.map((item, index) => {
                            return(
                                console.log("first", item.path)
                                
                                
                            )
                        })
                    }


                </div>

                <div className='detail-main-button'>
                   
                   <button onClick={() => navigate(-1)}>
                        Ana Sayfa
                    </button>
                   
                </div>
            
            

            

        </div>
    )
}

export default Details;