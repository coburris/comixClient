import React, {useEffect, useState} from 'react';

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
    return comics.map((comic) => {
        return(
        <p>{comic.issue_name}</p>
        )
    })
}
    return ( 
    <div>
        {comicsMapper}
    </div> 
    );
}

export default ShelfIndex;