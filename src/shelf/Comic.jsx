import React, { useState } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { UncontrolledCollapse, Button, CardBody, Card, Row, Col } from 'reactstrap';


const Comic = (props) => {
  let toggleId = "comic" + props.index;
  let toggleSelector = "#comic" + props.index;

  //Need to take "api" out of the url ... 'cause I messed that up in the model
  let whereAPI = props.comic.api_detail_url.indexOf("api");
  let comicVinePage = props.comic.api_detail_url.slice(0, whereAPI) + props.comic.api_detail_url.slice(whereAPI+3);
  return ( 
      <tr key={props.comic.id} className='table_row'>
        <Row class="comicRow">
          <Col md="2" className="image_col">
            <img src={props.comic.thumb_image_url} alt={props.comic.issue_name} class="com_thumb"/>
          </Col>
          <Col md="8">
            <Row> 
              <h4><a href={comicVinePage} target="_blank"><strong>{props.comic.issue_name}</strong> </a></h4>
            </Row>
            <Row> 
              <Col md="5"><p><strong>Volume:</strong> {props.comic.volume_name}</p></Col>
              <Col md="3"><p><strong>Issue: </strong>{props.comic.issue_number}</p></Col>
              <Col md="2"> 
              <Button color="primary" id={toggleId} style={{ marginBottom: '1rem' }}>
                Details
              </Button>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <UncontrolledCollapse toggler={toggleSelector}>
            <Card>
              <CardBody>
                <div className='comic-desc'>{ReactHtmlParser(props.comic.description)}</div>
              </CardBody>
            </Card>
          </UncontrolledCollapse>
        </Row>
      </tr>


   );
}
 
export default Comic;