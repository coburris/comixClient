import React, {useEffect, useState} from 'react';
import Comic from './Comic';
import RandomComic from './RandomComic';
import {Container, Row, Col, Button} from 'reactstrap'
import './ShelfIndex.css';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    Nav,
} from 'reactstrap';
import SearchPage from '../search/SearchPage';


const ShelfIndex = (props) => {
    const [comics, setComics] = useState();
    const [comicsStart, setComicsStart] = useState([0,0,0]);
    const [showRandom, setShowRandom] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    
    const maxOnShelf = 8;

    //FUNCTIONS

    // useEffect(() => {
    //     comics ? console.log(comics.length) : console.log("No comics man!")
    // }, []) 
    
    const fetchComics = () => {
        const url = 'http://localhost:3000/shelf/'
        //console.log("got to here in fetch")
        fetch(url,
        {
            method: 'GET',
            headers: new Headers ({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
            })
        })
        .then( (res) => res.json())
        .then((comicData) => {
                setComics(comicData)
               // console.log(comicData);
        })
    }


    useEffect(() => {
        if(localStorage.getItem('new_comic')){
            console.log(localStorage.getItem('new_comic'))
            let server_url = 'http://localhost:3000/shelf/'
        
            fetch(server_url, {
            method: 'POST',
            headers: new Headers(
                {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
                }
            ),
            body: localStorage.getItem('new_comic')
            })
            .then(response => response.json())
            .then(() => {
            localStorage.removeItem("new_comic")
            })
            .catch(err => console.log(`Failed comic post to server: ${err}`))
            .finally(fetchComics());
        }else{
            fetchComics();
        }
        
    }, []);

    const toggleNav = () => {
        let newIsOpen = !isOpen;
        setIsOpen(newIsOpen); 
    }


    const comicsStatusMapper = (status) => {
        
        let start = comicsStart[status];
        //console.log(start);
        let comicsInStatus = comics.filter(comic => comic.status === status);
        let comicsOnShelf = comicsInStatus.slice(start, start + maxOnShelf);
        //console.log(comicsOnShelf.length)
        

        return (
            <>  
                {comicsInStatus.length >= maxOnShelf || 
                    (comicsInStatus > 0 && !comicsOnShelf.includes(comicsInStatus[0]))
                ?<Button 
                outline 
                style={{position:"absolute", bottom:"30%", left:"-20px", fontWeight:"900"}}
                onClick = {() => shelfShift(status, -1, comicsOnShelf.length)}
                >                     
                    &lt; 
                </Button>
                :
                null
                }

                <div className='comics-shelf-contents' style={shelfContentsStyle}>

                    {comicsInStatus.length > 0
                    
                    ?comicsOnShelf.map((comic, index) => {
                            return(
                                <Comic token={props.token} comic={comic} index={index} fetchComics={fetchComics}/>
                            )
                    })
                    : <p style = {noComicStyle}> Our hero has no comics here ... for now</p>
                    
                    }

                </div>
                    {comicsInStatus.length >= maxOnShelf || 
                        (comicsInStatus > 0 && !comicsOnShelf.includes(comicsInStatus[0]))
                    ?<Button 
                        outline 
                        style={{position:"absolute", bottom:"30%", left:"81vw"}}
                        onClick = {() => shelfShift(status, 1, comicsOnShelf.length)}

                    > 
                            &gt; 
                    </Button>
                    :
                    null
                    }
            </>

        )
    }

    function shelfShift(status, dir, numOnShelf){
        console.log(numOnShelf);
        let diffStart = comicsStart[status]

        if (dir < 0) {
            diffStart = diffStart + dir >= 0  ? diffStart + dir: diffStart;
        }
        
        else if (dir > 0) {
            diffStart = numOnShelf > (maxOnShelf-1) ? diffStart + dir: diffStart;
        }
        
        switch (status) {
            case 0:
                setComicsStart([diffStart, comicsStart[1],  comicsStart[2]]);
                break;
            case 1:
                setComicsStart([comicsStart[0], diffStart, comicsStart[2]]);
                break;
            case 2:
                setComicsStart([comicsStart[0], comicsStart[1], diffStart]);
                break;

        }
    ;
    }

    //STYLE
    const shelfStyle = 
        {
            minHeight: "fit-content",
            //borderBottom: "solid 2px",
        }
    const shelfContentsStyle = 
        {
            display:"flex", 
            flexDirection:"row", 
            justifyContent:"flex-start",
            // flexWrap: "wrap",
            alignItems: "flex-end",
            margin: "1vh 0vh 1vh 0vh",
            padding: "0.25vh 0vh 0.25vh 0vh",
            borderBottom: "solid 2px",
            width:"80vw",
            // height: "fit-content"
            minHeight: "20vh"
        }

    const shelfTitleStyle = 
        {
            //height: "4vh",
            textAlign: "left",
            fontWeight: "bold",
            margin: "4vh 2vw 1vh 4vw",
        }
    
    const randComicCompStyle = 
        {
            margin:"30px"
        }
    
    const titleStyle = 
        {
        fontFamily: "'Comic Sans MS', 'Comic Sans', 'cursive'",
        fontWeight: "bold",
        textAlign: "center"
        }

    const noComicStyle = 
        {
            fontFamily: "'Comic Sans MS', 'Comic Sans', 'cursive'",
            fontSize: "1.5rem",
            border: "solid 2px",
            padding: "10px",
            color: "#b4b5ad",
            position: "relative",
            left: "20%",
            bottom: "5vh"
        }

    let getRandomButtonStyle = 
        {
            margin: '5px',
            alignSelf: "center",
            backgroundColor: "white",
            color:'black',
            border: 'solid 2px black',
            boxShadow: '6px 6px -2px #000',
            overflow: 'hidden',
            //   transform:'skew(-5deg)',
            fontFamily: 'Comic Sans MS',
            //marginRight: "90%",
            height: 'auto',
            width: '9rem',
            fontSize: "1rem"
        }

    let speechBubbleStyle = 
        {
            width:"18vw", 
            height:"20vh", 
            fontSize:"1rem", 
            margin:"0",
            position: "absolute",
            top: "-120px",
            left: "40px"
        }

    let aquamanStyle = 
        {
            width:"35%",
            position: "absolute",
            top: "-40px",
            left:"-60px"

        }
    
    return ( 
        <Container className = 'comicShelf'>
            <Row style={randComicCompStyle}>
                <Col md="6" style={{display:"flex", flexDirection:"row", justifyContent:"flex-start"}}>
                    <img 
                    src="/images/aquaman.png" 
                    alt="https://www.pngarts.com/explore/30569 Creative Commons 4.0 BY-NC"
                    style={aquamanStyle}
                    />
                    <blockquote className= 'speech-bubble2' style={speechBubbleStyle}>View your saved comics or find something new!</blockquote>
                </Col> 
                <Col md="6" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <Button onClick={()=>setShowRandom(!showRandom)} style={getRandomButtonStyle}>
                            {showRandom ?  "Close Random":"Get Random" }
                    </Button>
                    
                    {(showRandom) 
                    ? <RandomComic token={props.token} fetchComics={fetchComics} setShowRandom={setShowRandom}/> 
                    : null }
                </Col> 
            </Row> 
            <Row>
                <Col>
                    {(comics && comics.length>0) ? <h2 style={titleStyle}>{localStorage.getItem('alter_ego')}</h2> : <></>}
                </Col>    
            </Row>  
            <Row style={shelfStyle}> 
                <Col>
                    <h4 className="shelfTitle" style={shelfTitleStyle}>Wanted</h4>
                        {(comics && comics.length>=0) ? comicsStatusMapper(0) : <></>}
                </Col>
            </Row>
            <Row style={shelfStyle}>
                <Col>
                    <h4 className="shelfTitle" style={shelfTitleStyle}>Reading</h4>
                        {(comics && comics.length>=0) ? comicsStatusMapper(1) : <></>}
                </Col>
            </Row>
            <Row style={shelfStyle}>
                <Col>
                    <h4 className="shelfTitle" style={shelfTitleStyle}>Read</h4>
                        {(comics && comics.length>=0) ? comicsStatusMapper(2) : <></>}
                </Col> 
            </Row>
            
        </Container>
    );
}

export default ShelfIndex;