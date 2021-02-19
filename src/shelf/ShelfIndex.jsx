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

    
    const shelfStyle = 
        {
            display:"flex", 
            flexDirection:"row", 
            justifyContent:"flex-start",
            margin: "20px 0px 20px 0px"
        }

    const wantComicsMapper = () => {
        return comics.map((comic, index) => {
            if(comic.status === 0){
                return(

                    <Comic key={comic.id} comic={comic} index={index}/>
                )
            }
        })
    }

    const readingComicsMapper = () => {
        return comics.map((comic, index) => {
            if(comic.status === 1){
                return(

                    <Comic key={comic.id} comic={comic} index={index}/>
                )
            }
        })
    }

    const readComicsMapper = () => {
        return comics.map((comic, index) => {
            if(comic.status === 2){
                return(

                    <Comic key={comic.id} comic={comic} index={index}/>
                )
            }
        })
    }

    return ( 
        <div>
            {(comics && comics.length>0) ? <h3>Owner {comics[0].owner}</h3> : <></>}
            <h5>Wanted</h5>
            <div className='want-comics' 
            style={shelfStyle}>
                {(comics && comics.length>0) ? wantComicsMapper() : <></>}
            </div>
            <h5>Reading</h5>
            <div className='reading-comics' 
            style={shelfStyle}>
                {(comics && comics.length>0) ? readingComicsMapper() : <></>}
            </div>
            <h5>Read</h5>
            <div className='read-comics' 
            style={shelfStyle}>
                {(comics && comics.length>0) ? readComicsMapper() : <></>}
            </div>
        </div> 
    );
}

export default ShelfIndex;