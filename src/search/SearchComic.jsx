import React, { useState } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import {
  Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, 
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Tooltip, 
  Collapse, Form, Input, FormGroup, Label} from 'reactstrap';


const SearchComic = (props) => {

  const [modal, setModal] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [comicStatus, setComicStatus] = useState(props.comic.status);
  const [comicName, setComicName] = useState(props.comic.issue_name);
  const [comicVolume, setComicVolume] = useState(props.comic.volume_name);
  const [comicIssueNumber, setComicIssueNumber] = useState(props.comic.issue_number);
  const [comicPublisher, setComicPublisher] = useState(props.comic.publisher);
  const [comicCoverDate, setComicCoverDate] = useState(props.comic.cover_date);
  const [comicCharacters, setComicCharacters] = useState(props.comic.characters);
  const [comicTeams, setComicTeams] = useState(props.comic.teams);
  const [comicStoryArcs, setComicStoryArcs] = useState(props.comic.story_arcs);
  const [comicDescription, setComicDescription] = useState(props.comic.description);
  
  

  //Functions
  const toggle = () => setModal(!modal);
  const toggleToolTip = () => setTooltipOpen(false);
  const toggleEditForm = () => setEditOpen(!editOpen);

  // removes from the database and fetches again ... would be nice if I could just get rid of it locally :)
  function deleteComic(){
    
    let server_url = `http://localhost:3000/shelf/delete/${props.comic.id}`
    
    console.log(server_url)

    fetch(server_url, {
      method: 'DELETE',
      headers: new Headers(
        {
          'Content-Type': 'application/json',
          'Authorization': props.token
        }
      )
    })
    .then(response => response.json())
    .then(response_data => {
      console.log(response_data);
      props.fetchComics();
    })
    .catch(err => console.log(`Failed comic delete: ${err}`));

    toggle()
    
  }


  // Style
  const cardStyle = 
    {
     // maxHeight:"24vh", 
      margin:"1rem 1rem 0rem 1rem",
      minWidth: "100px",
      // postion:"absolute", 
      // bottom:"0px"
      
    }

  const cardImageStyle = 
    {
      //maxHeight: "18vh",
      objectFit: "contain",
      minWidth: "100px",
      maxWidth: "15vw"
    }
  //Need to take "api" out of the url ... 'cause I messed that up in the model
  let whereAPI = props.comic.api_detail_url.indexOf("api");
  let comicVinePage = props.comic.api_detail_url.slice(0, whereAPI) + props.comic.api_detail_url.slice(whereAPI+3);
  
  return (
    <div>
      <Card style={cardStyle} id="comic-card">
        <CardImg 
          top
          src={props.comic.thumb_image_url} 
          alt={props.comic.issue_name}
          onClick={toggle} 
          style={cardImageStyle}
          id="card-image"
        />
        <div className="card-body">
            <h5 className="card-title">{props.comic.issue_name} Issue #{props.comic.issue_number}</h5>
            <p className="card-text">{ReactHtmlParser(props.comic.description)}</p>
        </div>
      </Card>

      {/* DETAILS MODAL */}
        {/* 
              
        
        
          </div>
          <div className='comic-desc' style={{borderTop:"solid 1px"}}>
            {ReactHtmlParser(props.comic.description)}
          </div> */}
    </div>
  );
}

export default SearchComic;