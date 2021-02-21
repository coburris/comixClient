import React, {useEffect, useState} from 'react';
import Comic from './Comic';
import RandomComic from './RandomComic';
import {Container, Row, Col} from 'reactstrap'


const ShelfIndex = (props) => {
    const [comics, setComics] = useState();

    //FUNCTIONS
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

    const comicsStatusMapper = (status) => {
        return comics.map((comic, index) => {
            if(comic.status === status){
                return(

                    <Comic token={props.token} comic={comic} index={index} fetchComics={fetchComics}/>
                )
            }
        })
    }


    //STYLE
    const shelfStyle = 
        {
            minHeight: "fit-content"
        }
    const shelfContentsStyle = 
        {
            display:"flex", 
            flexDirection:"row", 
            justifyContent:"flex-start",
            flexWrap: "wrap",
            alignItems: "flex-end",
            margin: "1vh 0vh 1vh 0vh",
            padding: "0.25vh 0vh 0.25vh 0vh",
            borderBottom: "solid 2px",
            width:"80vw",
            // height: "fit-content"
        }

    const shelfTitleStyle = 
        {
            //height: "4vh",
            textAlign: "center",
            fontWeight: "bold",
            margin: "2vh 0vh 2vh 0vh",
        }
    
    const randComicCompStyle = 
        {
            margin:"30px"
        }
    
    return ( 
        <Container className = 'comicShelf'>
            <Row>
                <Col>
                    {(comics && comics.length>0) ? <h3>Owner {comics[0].owner}</h3> : <></>}
                </Col>    
            </Row>
            <Row style={shelfStyle}> 
                <Col>
                    <h4 className="shelfTitle" style={shelfTitleStyle}>Wanted</h4>
                    <div className='want-comics' style={shelfContentsStyle}>
                        {(comics && comics.length>0) ? comicsStatusMapper(0) : <></>}
                    </div>
                </Col>
            </Row>
            <Row style={shelfStyle}>
                <Col>
                    <h4 className="shelfTitle" style={shelfTitleStyle}>Reading</h4>
                    <div className='reading-comics' style={shelfContentsStyle}>
                        {(comics && comics.length>0) ? comicsStatusMapper(1) : <></>}
                    </div>
                </Col>

            </Row>
            <Row style={shelfStyle}>
                <Col>
                    <h4 className="shelfTitle" style={shelfTitleStyle}>Read</h4>
                    <div className='read-comics' style={shelfContentsStyle}>
                        {(comics && comics.length>0) ? comicsStatusMapper(2) : <></>}
                    </div>
                </Col> 
            </Row>
            <Row style={randComicCompStyle}>
                <Col>
                    <RandomComic token={props.token} fetchComics={fetchComics}/>
                </Col>   
            </Row>    
        </Container>
    );
}

export default ShelfIndex;