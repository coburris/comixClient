import React, {useEffect, useState} from 'react';
import Comic from './Comic';

const ShelfIndex = (props) => {
    const [comics, setComics] = useState();

    const fetchComics = () => {
        const url = 'http://localhost:3000/shelf/'
        fetch(url,
        {
            method: 'GET',
            headers: new Headers ({
            'Content-Type': 'application/json',
            'Authorization': props.token
            })
        }).then( (res) => res.json())
        .then((comicData) => {
                setComics(comicData)
                console.log(comicData);
        })
    }

    useEffect(() => {
        fetchComics();
    }, []);


    const comicsMapper = () => {
        return comics.map((comic, index) => {
            return(

                <Comic key={comic.id} comic={comic} index={index}/>
            )
        })
    }

    return ( 
        <div>
            {(comics) ? <h3>Owner {comics[0].owner}</h3> : <></>}
            {(comics) ? comicsMapper() : <></>}
        </div> 
    );
}

export default ShelfIndex;