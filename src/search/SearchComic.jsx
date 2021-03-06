import React, { useEffect, useState } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import {
Card, CardImg, CardText, CardBody, CardDeck, CardTitle, CardSubtitle, 
Button, Modal, ModalHeader, ModalBody, ModalFooter, Tooltip, 
Collapse, Form, Input, FormGroup, Label, CardGroup} from 'reactstrap';
import SearchPage from './SearchPage'
import './SearchComic.css'
import {
    BrowserRouter as Router,
    Link
    } from 'react-router-dom';


const SearchComic = (props) => {

    const [comic, setComic] = useState();
    const [hasNewComic, setHasNewComic] = useState(false);
    const [selected, setSelected] = useState(props.selected);

    console.log(selected);

    useEffect(() => {
        setComic(props.comic);
    }, []);

    useEffect(() => {
        setSelected(false);
    }, [props.comic]);



    function addComic(){
        setSelected(true)
        console.log("got to add comic")
        console.log(comic);
        alert('Your comic has been added to your shelf')

        let comic_data = 
        {
            issue_id: comic.id,
            issue_name: comic.name,
            issue_id: comic.issue_id,
            issue_name: comic.issue_name,
            issue_number: comic.issue_number,
            cover_date: comic.cover_date,
            volume_name: comic.volume_name,
            volume_id: comic.volume_id,
            story_arcs: null,
            publisher: null,
            teams: null,
            description: (comic.description === null) ? "No Description" :  comic.description,
            characters: null,
            original_image_url: comic.original_image_url,
            thumb_image_url: comic.thumb_image_url,
            small_image_url: comic.small_image_url,
            api_detail_url: comic.api_detail_url,
            status: 0
        }
        console.log(props.comic)
        console.log("HERE IS THE COMIC DATA FOR THE DATABASE")
        console.log(comic_data);
        
        if (!localStorage.getItem('token')) {
            localStorage.setItem('new_comic', JSON.stringify(comic_data));  //adds comic to local storage
            setHasNewComic(true);
            props.setAuthModal(true)
        }else{
            let server_url = 'http://localhost:3000/shelf/'
    
            fetch(server_url, {
            method: 'POST',
            headers: new Headers(
                {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
                }
            ),
            body: JSON.stringify(comic_data)
            })
            .then(response => response.json())
            .then(response_data => {
            console.log(response_data)
            //props.fetchResults();
            })
            .catch(err => console.log(`Failed comic post to server: ${err}`));
        }
    }
    

    

const cardStyle = 
    {
    maxHeight:"100vh", 
    //  maxWidth:"20vw",
    margin:"1rem 1rem 0rem 1rem",
    minWidth: "100px",
    postion:"relative", 
    //   bottom:"0px"
    border: "solid 5px black"
    }

const cardImageStyle = 
    {
    maxHeight: "40vh",
    objectFit: "contain",
    //   minWidth: "100px",
    //   maxWidth: "15vw"
    }

    const cardbody = 
    {
        textAlign: "center",
        color: "white",
        fontFamily:"Comic Sans MS",
    }

    const cardtext = 
    {
        textAlign: "center",
        maxLength: "20",
        fontFamily:"Comic Sans MS",
        // fontWeight: "bold"
        color: "white"
    }

    const buttonStyle =
    {
        // backgroundColor: "#338ef5"
        backgroundImage:"radial-gradient(circle, yellow, orange)",
        // backgroundImage: "radial-gradient(circle, #0052a2, #02386e)",
        fontFamily:"Comic Sans MS",
        color: "black"
    }

    const selectedStyle = 

    {
       color: "yellow" ,
       position: "absolute",
       top: "15%",
       left: "10%",
       fontFamily: "'Bangers', cursive",
       overflow: "visible",
       textAlign: "center",
       fontSize: "8vh"
       
    }


return (
    <>
    <CardDeck>
    <Card style={cardStyle} id="comic-card">
        <CardImg 
        top
        src={props.comic.small_image_url} 
        alt={props.comic.issue_name}
        style={cardImageStyle}
        id="card-image"
        />
        {selected ? <p style={selectedStyle}>Got It!</p> : null}
            <CardBody style={cardbody}>{props.comic.issue_name} Issue #{props.comic.issue_number}</CardBody>
            <CardText style={cardtext} >{ReactHtmlParser(props.comic.description)}</CardText>
    <Button style={buttonStyle}
    variant="outline-primary" onClick={addComic} >
    Add to Shelf
    </Button>
    </Card>
    </CardDeck>
    {/* <div>
        <button onClick={(e) => props.changePage(e, 'down')}>Previous</button>
        <button onClick={(e) => props.changePage(e, 'up')}>Next</button>
    </div> */}
</>
);
}



export default SearchComic;