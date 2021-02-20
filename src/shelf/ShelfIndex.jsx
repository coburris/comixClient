import React, {useEffect, useState} from 'react';
import Comic from './Comic';
import RandomComic from './RandomComic';

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

    const fetchUser = () => {
        
    }

    useEffect(() => {
        fetchComics();
    }, []);

    
    const shelfStyle = 
        {
            display:"flex", 
            flexDirection:"row", 
            justifyContent:"flex-start",
            margin: "20px 0px 20px 0px",
            padding: "10px 0px 10px 0px",
            borderBottom: "solid 2px",
            width:"80vw",
            height: "28vh"
        }

    const shelfTitleStyle = 
        {
            textAlign: "center",
            fontWeight: "bold"
        }

    // REFACTOR THE BELOW ... REPETITIVE
    const wantComicsMapper = () => {
        return comics.map((comic, index) => {
            if(comic.status === 0){
                return(

                    <Comic token={props.token} comic={comic} index={index} fetchComics={fetchComics}/>
                )
            }
        })
    }

    const readingComicsMapper = () => {
        return comics.map((comic, index) => {
            if(comic.status === 1){
                return(

                    <Comic token={props.token} comic={comic} index={index} fetchComics={fetchComics}/>
                )
            }
        })
    }

    const readComicsMapper = () => {
        return comics.map((comic, index) => {
            if(comic.status === 2){
                return(

                    <Comic token={props.token} comic={comic} index={index} fetchComics={fetchComics}/>
                )
            }
        })
    }

    return ( 
        <div>
            <div className = 'comicShelf'>
                {(comics && comics.length>0) ? <h3>Owner {comics[0].owner}</h3> : <></>}
                <h4 className="shelfTitle" style={shelfTitleStyle}>Wanted</h4>
                <div className='want-comics'
                style={shelfStyle}>
                    {(comics && comics.length>0) ? wantComicsMapper() : <></>}
                </div>
                <h4 className="shelfTitle" style={shelfTitleStyle}>Reading</h4>
                <div className='reading-comics' 
                style={shelfStyle}>
                    {(comics && comics.length>0) ? readingComicsMapper() : <></>}
                </div>
                <h4 className="shelfTitle" style={shelfTitleStyle}>Read</h4>
                <div className='read-comics' 
                style={shelfStyle}>
                    {(comics && comics.length>0) ? readComicsMapper() : <></>}
                </div>
            </div>
            <RandomComic token={props.token} fetchComics={fetchComics}/>
        </div> 
    );
}

export default ShelfIndex;