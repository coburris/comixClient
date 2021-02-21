import React, { useState } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import {
  Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, 
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Tooltip} from 'reactstrap';


const Comic = (props) => {

  const [modal, setModal] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  

  //Functions
  const toggle = () => setModal(!modal);
  const toggleToolTip = () => setTooltipOpen(false);

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

  function updateComic() {
    let server_url = `http://localhost:3000/shelf/${props.comic.id}`
    
    let newComicData = {status: 1}

    fetch(server_url, {
      method: 'PUT',
      headers: new Headers(
        {
          'Content-Type': 'application/json',
          'Authorization': props.token
        }
      ),
      body: JSON.stringify(newComicData)
    })
    .then(response => response.json())
    .then(response_data => {
      console.log(response_data);
      props.fetchComics();
    })
    .catch(err => console.log(`Failed comic edit: ${err}`));

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

  const cardTitleStyle = 
    {
      margin:"0px", 
      fontWeight:"bold",
      fontSize: ".8rem",
      maxHeight: "6vh"
    }

  const cardBodyStyle = 
    {
      padding:"0px", 
      textAlign:"center"
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
        <Tooltip placement="top" isOpen={tooltipOpen} target="card-image" toggle={toggleToolTip}>
          {`${props.comic.issue_name}  ... click image for details`}
        </Tooltip>
      </Card>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}> 
          <strong>{props.comic.issue_name}</strong> 
          <br/>
          <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
            <span style={{fontSize:"1rem"}}> 
              {props.comic.volume_name} #{props.comic.issue_number}
            </span>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className='comic-publisher'>
            <p> <strong>Publisher: </strong>
              {(props.comic.publisher && props.comic.publisher.length > 0)
              ? props.comic.publisher
              : 'No publisher listed. EDIT to add.'} 
            </p>
          </div>
          <div className='comic-date'>
            <p> <strong>Cover Date: </strong>
              {(props.comic.cover_date && props.comic.cover_date.length > 0)
              ? props.comic.cover_date
              : 'No date listed. EDIT to add.'} 
            </p>
          </div>
          <div className='comic-characters'>
            <p> <strong>Characters: </strong>
              {(props.comic.characters && props.comic.characters.length > 0)
              ? props.comic.characters.join(', ')
              : 'No characters listed. EDIT to add.'} 
            </p>
          </div>
          <div className='comic-teams'>
            <p> <strong>Teams: </strong>
              {(props.comic.teams && props.comic.teams.length > 0)
                ? props.comic.teams.join(', ')
                : 'No teams listed. EDIT to add.'} 
            </p>
          </div>
          <div className='comic-stories'>
            <p> <strong>Story Arcs: </strong>
              {(props.comic.story_arcs && props.comic.story_arcs.length > 0)
                ? props.comic.story_arcs.join(', ')
                : 'No story arcs listed. EDIT to add.'} 
            </p>
          </div>
          <div className='comic-desc' style={{borderTop:"solid 1px"}}>
            {ReactHtmlParser(props.comic.description)}
          </div>
          
        </ModalBody>
        <ModalFooter style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <span style={{fontSize:".8rem"}}>
            <a href={comicVinePage} target="_blank"> See this issue on ComicVine </a> 
          </span>
          <div class="modal-footer-buttons" >
            <Button color="primary" onClick={updateComic} style={{margin:"5px"}}> Edit </Button>
            <Button color="primary" onClick={deleteComic} style={{margin:"5px"}}> Delete </Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
}
//   return ( 
//       <tr key={props.comic.id} className='table_row'>
//         <Row class="comicRow">
//           <Col md="2" className="image_col">
//             <img src={props.comic.thumb_image_url} alt={props.comic.issue_name} class="com_thumb"/>
//           </Col>
//           <Col md="8">
//             <Row> 
//               <h4><a href={comicVinePage} target="_blank"><strong>{props.comic.issue_name}</strong> </a></h4>
//             </Row>
//             <Row> 
//               <Col md="5"><p><strong>Volume:</strong> {props.comic.volume_name}</p></Col>
//               <Col md="3"><p><strong>Issue: </strong>{props.comic.issue_number}</p></Col>
//               <Col md="2"> 
//               <Button color="primary" id={toggleId} style={{ marginBottom: '1rem' }}>
//                 Details
//               </Button>
//               </Col>
//             </Row>
//           </Col>
//         </Row>

//         <Row>
//           <UncontrolledCollapse toggler={toggleSelector}>
//             <Card>
//               <CardBody>
//                 
//               </CardBody>
//             </Card>
//           </UncontrolledCollapse>
//         </Row>
//       </tr>


//    );
// }
 
export default Comic;