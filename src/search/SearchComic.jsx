import React, { useState } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import {
  Card, CardImg, CardText, CardBody, CardDeck, CardTitle, CardSubtitle, 
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Tooltip, 
  Collapse, Form, Input, FormGroup, Label, CardGroup} from 'reactstrap';


const SearchComic = (props) => {

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
            <CardBody textLimit={10} style={cardbody}>{props.comic.issue_name} Issue #{props.comic.issue_number}</CardBody>
            <CardText textLimit={20} style={cardtext} >{ReactHtmlParser(props.comic.description)}</CardText>
    <Button 
    variant="outline-primary" >
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