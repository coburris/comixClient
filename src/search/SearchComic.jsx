import React, { useEffect, useState } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import {
Card, CardImg, CardText, CardBody, CardDeck, CardTitle, CardSubtitle, 
Button, Modal, ModalHeader, ModalBody, ModalFooter, Tooltip, 
Collapse, Form, Input, FormGroup, Label, CardGroup} from 'reactstrap';
import SearchPage from './SearchPage'


const SearchComic = (props) => {

    const [comic, setComic] = useState();
    const [hasNewComic, setHasNewComic] = useState(false);


    useEffect(() => {
        setComic(props.comic);
    }, []);

    function addComic(){
        console.log("got to add comic")
        console.log(comic);

        let comic_data = 
        {
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

//props.setAuthModal(true)

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
    postion:"absolute", 
    //   bottom:"0px"

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
        
    }

    const cardtext = 
    {
        textAlign: "center",
        maxLength: "20"
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
            <CardBody style={cardbody}>{props.comic.issue_name} Issue #{props.comic.issue_number}</CardBody>
            <CardText style={cardtext} >{ReactHtmlParser(props.comic.description)}</CardText>
    <Button 
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