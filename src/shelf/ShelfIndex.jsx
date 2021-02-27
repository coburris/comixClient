import React, {useEffect, useState} from 'react';
import Comic from './Comic';
import RandomComic from './RandomComic';
import {Container, Row, Col, Button} from 'reactstrap'
import Sitebar from '../home/Sitebar';
import './ShelfIndex.css';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    Nav,
} from 'reactstrap';


const ShelfIndex = (props) => {
    const [comics, setComics] = useState();
    const [comicsStart, setComicsStart] = useState([0,0,0]);
    const [showRandom, setShowRandom] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    
    

    //console.log(comicsStart)
    

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
                //console.log(comicData);
        })
    }


    useEffect(() => {
        if(localStorage.getItem('new_random_comic')){
            console.log(localStorage.getItem('new_random_comic'))
            let server_url = 'http://localhost:3000/shelf/'
        
            fetch(server_url, {
            method: 'POST',
            headers: new Headers(
                {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
                }
            ),
            body: localStorage.getItem('new_random_comic')
            })
            .then(response => response.json())
            .then(response_data => {
              //console.log(response_data)
            localStorage.removeItem("new_random_comic")

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
        //console.log("this happened")
        let start = comicsStart[status];
        //console.log(start);
        let comicsOnShelf = comics.filter(comic => comic.status === status).slice(start, start + 8);
        return (
            <>
                <Button 
                    outline 
                    style={{position:"absolute", bottom:"30%", left:"-20px", fontWeight:"900"}}
                    onClick = {() => shelfShift(status, -1, comicsOnShelf.length)}
                >                     
                    &lt; 
                    
                </Button>
            <div className='comics-shelf-contents' style={shelfContentsStyle}>

                {comicsOnShelf.map((comic, index) => {
                        return(
                            <Comic token={props.token} comic={comic} index={index} fetchComics={fetchComics}/>
                        )
                })}

            </div>
                <Button 
                    outline 
                    style={{position:"absolute", bottom:"30%", left:"81vw"}}
                    onClick = {() => shelfShift(status, 1, comicsOnShelf.length)}

                > 
                    &gt; 
                </Button>
            </>

        )
    }

    function shelfShift(status, dir, numOnShelf){
        //console.log(numOnShelf);
        let diffStart = comicsStart[status]

        if (dir < 0) {
            diffStart = diffStart + dir >= 0  ? diffStart + dir: diffStart;
        }
        
        else if (dir > 0) {
            diffStart = numOnShelf > 7 ? diffStart + dir: diffStart;
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
            minHeight: "fit-content"
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
        }

    const shelfTitleStyle = 
        {
            //height: "4vh",
            textAlign: "left",
            fontWeight: "bold",
            margin: "2vh 2vw 1vh 2vw",
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

    
    return ( 
        <Container className = 'comicShelf'>
        <Navbar color="faded" light expand="md">
                <NavbarBrand href="/">Comix</NavbarBrand>
                <NavbarToggler onClick={toggleNav}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                    <NavItem>
                        </NavItem>
                    </Nav>
                </Collapse>
                            <Button onClick={props.clickLogout}>Logout</Button>
            </Navbar>
            <Row style={randComicCompStyle}>
                <Col>
                    {(!showRandom)
                    ?   <Button onClick={()=>setShowRandom(!showRandom)} style={{margin:"10px"}}>
                            Get Random
                        </Button>
                    : null
                    }
                    
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
                        {(comics && comics.length>0) ? comicsStatusMapper(0) : <></>}
                </Col>
            </Row>
            <Row style={shelfStyle}>
                <Col>
                    <h4 className="shelfTitle" style={shelfTitleStyle}>Reading</h4>
                        {(comics && comics.length>0) ? comicsStatusMapper(1) : <></>}
                </Col>
            </Row>
            <Row style={shelfStyle}>
                <Col>
                    <h4 className="shelfTitle" style={shelfTitleStyle}>Read</h4>
                        {(comics && comics.length>0) ? comicsStatusMapper(2) : <></>}
                </Col> 
            </Row>
            
        </Container>
    );
}

export default ShelfIndex;