import React, {useEffect, useState} from 'react';
import Comic from './Comic';
import RandomComic from './RandomComic';
import {} from 'reactstrap'
import {Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
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
import APIURL from '../helpers/environment';


const ShelfIndex = (props) => {
    const [comics, setComics] = useState();
    const [comicsStart, setComicsStart] = useState([0,0,0]);
    const [showRandom, setShowRandom] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [modal, setModal] = useState(false);
    
    const maxOnShelf = 8;

    //FUNCTIONS

    // useEffect(() => {
    //     comics ? console.log(comics.length) : console.log("No comics man!")
    // }, []) 
    
    const fetchComics = () => {
        const url = `${APIURL}/shelf/`
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
            console.log(comicData);
            // if(comics){
            //     getSafeComics()
            // }
        })
    }

    // function getSafeComics() {
    //     let safeIds = [];
    //     comics.forEach(comic => safeIds.push(comic.issue_id));
    //     console.log(safeIds)
    // }


    useEffect(() => {
        if(localStorage.getItem('new_comic')){
            console.log(localStorage.getItem('new_comic'))
            let server_url = `${APIURL}/shelf/`
        
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

    const toggleModal = () => {
        setModal(!modal); 
    }


    const comicsStatusMapper = (status) => {
        
        let start = comicsStart[status];
        //console.log(start);
        let comicsInStatus = comics.filter(comic => comic.status === status);
        comicsInStatus.sort((a, b) => a.createdAt - b.createdAt);
        let comicsOnShelf = comicsInStatus.slice(start, start + maxOnShelf);
        //console.log(comicsOnShelf.length)
        

        return (
            <div className="col comic-shelf">  
                {comicsInStatus.length >= maxOnShelf || 
                    (comicsInStatus > 0 && !comicsOnShelf.includes(comicsInStatus[0]))
                ?<Button 
                outline 
                style={leftShiftButtonStyle}
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
                        style={rightShiftButtonStyle}
                        onClick = {() => shelfShift(status, 1, comicsOnShelf.length)}

                    > 
                            &gt; 
                    </Button>
                    :
                    null
                    }
            </div>

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

    const randomModalStyle = 
        {
            width:"25vw", 
            padding: "10px",
            backgroundColor: "white",
            border: "solid 3px"
        }
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
            alignItems: "flex-end",
            margin: "1vh 0vh 1vh 0vh",
            padding: "0.25vh 0vh 0.25vh 0vh",
            border: "solid 2px",
            width:"100%",
            // height: "fit-content"
            minHeight: "20vh",
            backgroundImage:"radial-gradient(circle, #f8d568, #fa7a48)",
        }

    const shelfTitleStyle = 
        {
            //height: "4vh",
            textAlign: "left",
            fontWeight: "bold",
            margin: "4vh 2vw 1vh 10vw",
            fontFamily: "'Comic Sans MS', 'Comic Sans', 'cursive'",
            margin: '5px',
            alignSelf: "center",
            backgroundColor: "white",
            color:'black',
            border: 'solid 2px black',
            boxShadow: '6px 6px -2px #000',
            overflow: 'hidden',
            //   transform:'skew(-5deg)',
            //marginRight: "90%",
            height: 'auto',
            width: '5rem',
            fontSize: "1rem",
            padding: "5px"
        }

    
    const randComicCompStyle = 
        {
            margin:"30px",
            height:"auto",
            position:"relative",
            maxHeight:"40vh",
            minHeight:"25vh"
        }
    

    const noComicStyle = 
        {
            fontFamily: "'Comic Sans MS', 'Comic Sans', 'cursive'",
            fontSize: "1.5rem",
            border: "solid 2px",
            padding: "10px",
            color: "black",
            position: "relative",
            left: "20%",
            bottom: "3vh",
            backgroundColor: "white"
        }
    
    let alterEgoChars = localStorage.getItem('alter_ego').length;
    let alterEgoWords = localStorage.getItem('alter_ego').split().length;

    let longAlterEgo = alterEgoChars > 12;
    
    const titleStyle = 
        {
        fontFamily: "'Bangers', cursive",
        position:"relative",
        left:"15vw",

        //fontFamily: "'Comic Sans MS', 'Comic Sans', 'cursive'",
        fontWeight: "bold",
        textAlign: "center",
        color:"red",
        //backgroundColor: "white",
        // marginLeft: "30vw",
        //marginRight: "auto",
        width: "40vw",
        //border: "solid 2px",
        //borderRadius: "3px",
        // padding: "10px",
        fontSize: longAlterEgo ? "13vh" : "18vh",
        webkitTextStroke: "3px black",
        transform:"rotate(-10deg)"
        }

    let getRandomButtonStyle = 
        {
            // marginLeft: '100px',
            // alignSelf: "center",
            position:"absolute",
            right:"5%",
            bottom:"-7vh",
            zIndex:"2",
            color:'red',
            border: 'none',
            //boxShadow: '6px 6px -2px #000',
            //   transform:'skew(-5deg)',
            fontFamily: 'Comic Sans MS',
            //marginRight: "90%",
            height: '20vh',
            width: '24vw',
            fontSize: "3.5vh",
            fontWeight: "bold",
            background: "url('/images/boom.png') no-repeat",
            backgroundSize: "100% 100%",
            //backgroundColor: "white",
            backgroundPosition: "0px -4px",
            overflow: "visible",
            webkitTextStroke: "1px black",
            paddingTop: "3vh",
            whiteSpace:"normal"
        
        }


    let speechBubbleStyle = 
        {
            width:"16vw", 
            height:"19vh", 
            fontSize:"1vw", 
            margin:"0",
            position: "absolute",
            top: "-10vh",
            left: "6vw",
            paddingTop:"2vh"
        }

    let aquamanStyle = 
        {
            width:"20vw",
            position: "absolute",
            top: "0vh",
            left:"-5vw"

        }

    let leftShiftButtonStyle = 
        {
            position:"absolute",
            bottom:"37%",
            right:"100%",
            fontWeight:"900",
            backgroundColor: "white"
        }
    let rightShiftButtonStyle = 
        {
            position:"absolute",
            bottom:"37%",
            left:"100%",
            fontWeight:"900",
            backgroundColor: "white"
        }
    return ( 
        <Container className = 'comicShelf'>
            <Row style={randComicCompStyle}>
                {/* <Col md="3" style={{display:"flex", flexDirection:"row", justifyContent:"flex-start"}}> */}
                    <img 
                    src="/images/aquaman.png" 
                    alt="https://www.pngarts.com/explore/30569 Creative Commons 4.0 BY-NC"
                    style={aquamanStyle}
                    />
                    <blockquote className= 'speech-bubble2' style={speechBubbleStyle}>View your comics or find something new to discover!</blockquote>
                {/* </Col> */}
                {/* <Col md="6"> */}
                    
                    <h2 style={titleStyle}>
                        {localStorage.getItem('alter_ego')
                        ?localStorage.getItem('alter_ego')
                        :"??????"}
                    </h2> 
                
                {/* </Col>   */}
                {/* <Col md="3" style={{display:"flex", flexDirection:"column", alignItems:"right"}}> */}
                    <Button onClick={()=>toggleModal()} style={getRandomButtonStyle}>
                        Randomize!
                    </Button>
                    
                    <Modal className="here I am" isOpen={modal} toggle={toggleModal} style={randomModalStyle}>  
                    
                        <RandomComic token={props.token} fetchComics={fetchComics} toggleModal={toggleModal}/> 
                    
                    </Modal>
                {/* </Col>  */}
            </Row> 
    
            <Row style={shelfStyle}> 
                <Col>
                    <h4 className="shelfTitle" style={shelfTitleStyle}>Wanted</h4>
                        <div>{(comics && comics.length>=0) ? comicsStatusMapper(0) : <></>}</div>
                </Col>
            </Row>
            <Row style={shelfStyle}>
                <Col>
                    <h4 className="shelfTitle" style={shelfTitleStyle}>Reading</h4>
                        <div>{(comics && comics.length>=0) ? comicsStatusMapper(1) : <></>}</div>
                </Col>
            </Row>
            <Row style={shelfStyle}>
                <Col>
                    <h4 className="shelfTitle" style={shelfTitleStyle} >Read</h4>
                        <div>{(comics && comics.length>=0) ? comicsStatusMapper(2) : <></>}</div>
                </Col> 
            </Row>
            
        </Container>
    );
}

export default ShelfIndex;