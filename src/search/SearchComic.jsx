import React, { useState } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import {
Card, CardImg, CardText, CardBody, CardDeck, CardTitle, CardSubtitle, 
Button, Modal, ModalHeader, ModalBody, ModalFooter, Tooltip, 
Collapse, Form, Input, FormGroup, Label, CardGroup} from 'reactstrap';


const SearchComic = (props) => {

    const [comic, setComic] = useState();
    const [hasNewComic, setHasNewComic] = useState(false)



    // function getSpecificComic(){
    //     let api_key = "f54468c5a18c035f1c1ab8734536b731c9e2ba0d";
    //     let comic_id = `4000-${comic.id}`
    //     let heroku_cors = "efa-cors-anywhere.herokuapp.com/";
    //     let url = `https://${heroku_cors}comicvine.gamespot.com/api/issue/${comic_id}/?api_key=${api_key}&format=json`
    
    
    //     fetch(url)
    //     .then(response => {
    //         return response.json()
    //     })
    //     .then(data => {
    //         data.error === "OK" ? setComic(data) : addComic()
    //     })
    //     .catch(err => {
    //     console.log(`Failed fetch: ${err}`);
    //     addComic();
    //     });
    // }




    function addComic(){
        console.log("got to add comic")
        // console.log(comicStatus);
    
        // let stories = [];
        // for(let i = 0; i < comic.story_arc_credits.length; i++){
        //     stories[i] = comic.story_arc_credits[i].name;
        // }
    
        // let characters = [];
        // for(let i = 0; i < comic.character_credits.length; i++){
        //     characters[i] = comic.character_credits[i].name;
        // }
    
        // let teams = [];
        // for(let i = 0; i < comic.team_credits.length; i++){ 
        //     teams[i] = comic.team_credits[i].name;
        // }
    
    
        getComic()
        .then(response => response.json())
        .catch(err => {
        console.log(`Issue fetch failed:  ${err}`)
        })
        .finally(() => {
        let comic_data = 
        {
            issue_id: comic .id,
            issue_name: comic.name,
            issue_number: comic.issue_number,
            cover_date: comic.cover_date,
            volume_name: comic.volume.name,
            volume_id: comic.volume.id,
            story_arcs: null,
            publisher: null,
            teams: null,
            description: (comic.description === null) ? "No Description" :  comic.description,
            characters: null,
            original_image_url: comic.image.original_url,
            thumb_image_url: comic.image.thumb_url,
            small_image_url: comic.image.small_url,
            api_detail_url: comic.api_detail_url,
            status: 0
        }
    
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
            props.fetchResults();
            })
            .catch(err => console.log(`Failed comic post to server: ${err}`));
        }
        });
    
        // toggle();
        
    
    }
    
    async function getComic() {
        let api_key = "f54468c5a18c035f1c1ab8734536b731c9e2ba0d";
        //let comic_id = '4000-14582';  //Gives Death Masque!
        let issue_id = `4000-${comic.id}`
        let heroku_cors = "efa-cors-anywhere.herokuapp.com/";
        let url = `https://${heroku_cors}comicvine.gamespot.com/api/issue/${issue_id}/?api_key=${api_key}&format=json`
    
        return fetch(url);
    } 

  // Style
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