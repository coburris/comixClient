import React, { useState } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import {
  Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, 
  Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';



const Comic = (props) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


  //Need to take "api" out of the url ... 'cause I messed that up in the model
  let whereAPI = props.comic.api_detail_url.indexOf("api");
  let comicVinePage = props.comic.api_detail_url.slice(0, whereAPI) + props.comic.api_detail_url.slice(whereAPI+3);
  
  return (
    <div>
      <Card style={{width:"8rem"}}>
        <CardImg 
          top width="100%" 
          src={props.comic.thumb_image_url} 
          alt={props.comic.issue_name}
          onClick={toggle} 
        />
        <CardBody style={{padding:"0px", textAlign:"center"}}>
          <CardTitle style={{margin:"0px", fontWeight:"bold"}} tag="p">{props.comic.issue_name}</CardTitle>
        </CardBody>
      </Card>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}> 
          {props.comic.issue_name} 
          <br/>
          <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
            <span style={{marginRight:"20px", fontSize:"1rem"}}> 
              {props.comic.volume_name} #{props.comic.issue_number}
            </span>
            <span style={{marginLeft:"20px", fontSize:"1rem"}}>
              {props.comic.cover_date}
            </span>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className='comic-desc'>{ReactHtmlParser(props.comic.description)}</div>
          <span style={{fontSize:".8rem"}}>
            <a href={comicVinePage} target="_blank"> See this issue on ComicVine </a> 
          </span>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}> Edit </Button>
          <Button color="primary" onClick={toggle}> Delete </Button>
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