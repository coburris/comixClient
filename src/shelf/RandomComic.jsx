import React, { useEffect, useState} from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import {
  Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, 
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap';

function RandomComic(props) {

  const [randComic, setRandComic] = useState();
  const [modal, setModal] = useState(false);
  const [comicStatus, setComicStatus] = useState(0);

  useEffect(() => {
    
    if(!randComic)
      getRandomComic()

  }, []);

  //Functions
  const toggle = () => setModal(!modal);

  function getRandomComic(){
    let api_key = "10b174a86660d99247de4c3b2117f611aecc1625";
    //let comic_id = '4000-14582';  //Gives Death Masque!
    let comic_id = `4000-${Math.floor(Math.random()*100000)}`
    //console.log(`Getting Comic: ${comic_id}`);
    let heroku_cors = "efa-cors-anywhere.herokuapp.com/";
    let url = `https://${heroku_cors}comicvine.gamespot.com/api/issue/${comic_id}/?api_key=${api_key}&format=json`


    fetch(url)
    .then(response => {
      //console.log(response.ok);
      return response.json()
    })
    .then(data => {
      //console.log(data)
      //setRandComic(data)
      data.error === "OK" ? setRandComic(data) : getRandomComic()
    })
    .catch(err => {
      console.log(`Failed fetch: ${err}`);
      getRandomComic();
    });
  }

  function displayComic(){
    if(randComic){
      var whereAPI = randComic.results.api_detail_url.indexOf("api");
      var comicVinePage = randComic.results.api_detail_url.slice(0, whereAPI) + randComic.results.api_detail_url.slice(whereAPI+3);
    }
    return (
      randComic 
      ? 
        <div>
          <img 
            src={randComic.results.image.original_url} 
            alt="" 
            style={{width:"50vh"}}
            onClick={toggle} />
          <br/>
          <br/>
          <Button 
            variant="outline-primary" 
            className="randComicButton"  
            style={randComicButtonStyle} 
            onClick={getRandomComic}>
              Get Random
          </Button>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}> 
              <strong>{randComic.results.name}</strong> 
              <br/>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <span style={{fontSize:"1rem"}}> 
                  {randComic.results.volume.name} #{randComic.results.issue_number}
                </span>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className='comic-date'>
                <p> 
                  {(randComic.results.cover_date && randComic.results.cover_date.length > 0)
                  ? " "  + randComic.results.cover_date
                  : '???'}
                </p>
              </div>
              <div className='comic-characters'>
                <p> Featuring
                  {(randComic.results.character_credits && randComic.results.character_credits.length > 0)
                  ? " " + randComic.results.character_credits[0].name
                  : '???'}
                  {(randComic.results.character_credits && randComic.results.character_credits.length > 1)
                  ? " and " + randComic.results.character_credits[1].name
                  : ''} 
                </p>
              </div>
              <div className='comic-teams'>
                <p> With 
                  {(randComic.results.team_credits && randComic.results.team_credits.length > 0)
                  ? " " + randComic.results.team_credits[0].name + "!"
                  : '???'} 
                </p>
              </div>
          
            </ModalBody>
            <ModalFooter style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
              <Form>
                <FormGroup>
                  <Input type="select" name="select" id="exampleSelect" onChange={(e)=>setComicStatus(e.target.value)}>
                    <option value="0">Want</option>
                    <option value="1">Reading</option>
                    <option value="2">Read</option>
                  </Input>
                </FormGroup>
              </Form>
                  
              <div class="modal-footer-buttons" >
                <Button 
                  variant="outline-primary" 
                  className="randComicButton" 
                  style={randComicButtonStyle} 
                  onClick={addComic}>
                    Add to Shelf
                </Button>
              </div>
            </ModalFooter>
          </Modal>
        </div>
      : null
    )
  }

  function addComic(){
    console.log("got to add comic")
    console.log(comicStatus);

    let stories = [];
    for(let i = 0; i < randComic.results.story_arc_credits.length; i++){
      stories[i] = randComic.results.story_arc_credits[i].name;
    }

    let characters = [];
    for(let i = 0; i < randComic.results.character_credits.length; i++){
      characters[i] = randComic.results.character_credits[i].name;
    }

    let teams = [];
    for(let i = 0; i < randComic.results.team_credits.length; i++){
      teams[i] = randComic.results.team_credits[i].name;
    }

    //let team_name = (randComic.results.team_credits.length > 0) ? randComic.results.team_credits[0].name : null

    let publisherName;

    getVolume()
    .then(response => response.json())
    .then(volume => {
      publisherName = (volume.error === "OK") ? volume.results.publisher.name : null;
    })
    .catch(err => {
      console.log(`Volume fetch failed:  ${err}`)
      publisherName = "Could not retrieve publisher"
    })
    .finally(() => {
      let comic_data = 
      {
        issue_id: randComic.results.id,
        issue_name: randComic.results.name,
        issue_number: randComic.results.issue_number,
        cover_date: randComic.results.cover_date,
        volume_name: randComic.results.volume.name,
        volume_id: randComic.results.volume.id,
        story_arcs: (stories.length > 0) ? stories : null,
        publisher: publisherName,
        teams: teams,
        description: (randComic.results.description === null) ? "No Description" :  randComic.results.description,
        characters: (characters.length > 0) ? characters : null,
        original_image_url: randComic.results.image.original_url,
        thumb_image_url: randComic.results.image.thumb_url,
        small_image_url: randComic.results.image.small_url,
        api_detail_url: randComic.results.api_detail_url,
        status: comicStatus
      }
  
      console.log("HERE IS THE COMIC DATA FOR THE DATABASE")
      console.log(comic_data);
   

      let server_url = 'http://localhost:3000/shelf/'

      fetch(server_url, {
        method: 'POST',
        headers: new Headers(
          {
            'Content-Type': 'application/json',
            'Authorization': props.token
          }
        ),
        body: JSON.stringify(comic_data)
      })
      .then(response => response.json())
      .then(response_data => {
        console.log(response_data)
        props.fetchComics();
      })
      .catch(err => console.log(`Failed comic post to server: ${err}`));
    });

    toggle();
    

  }

  async function getVolume() {
    let api_key = "10b174a86660d99247de4c3b2117f611aecc1625";
    //let comic_id = '4000-14582';  //Gives Death Masque!
    let volume_id = `4050-${randComic.results.volume.id}`
    let heroku_cors = "efa-cors-anywhere.herokuapp.com/";
    let url = `https://${heroku_cors}comicvine.gamespot.com/api/volume/${volume_id}/?api_key=${api_key}&format=json`

    return fetch(url);
  } 

  

  //Style
  let randComicButtonStyle = 
    {
      margin: "5px"
    }

  return (
    <div style={{textAlign:"center"}}>
      {displayComic()}
    </div>
  );
}

export default RandomComic;