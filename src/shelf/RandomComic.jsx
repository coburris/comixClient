import React, { useEffect, useState} from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Spinner} from 'reactstrap';

function RandomComic(props) {

  const [randComic, setRandComic] = useState();
  const [modal, setModal] = useState(false);
  const [comicStatus, setComicStatus] = useState(0);
  const [hasNewComic, setHasNewComic] = useState(false);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    
    !localStorage.getItem('currRawRandomComic') 
    ? getRandomComic() 
    : setRandComic(JSON.parse(localStorage.getItem('currRawRandomComic')))
      
    

  }, []);


  //Functions
  const toggle = () => setModal(!modal);

  function getRandomComic(){
    setWaiting(true);
    let api_key = "10b174a86660d99247de4c3b2117f611aecc1625";
    let comic_id = `4000-${Math.floor(Math.random()*100000)}`
    let heroku_cors = "efa-cors-anywhere.herokuapp.com/";
    let url = `https://${heroku_cors}comicvine.gamespot.com/api/issue/${comic_id}/?api_key=${api_key}&format=json`


    fetch(url)
    .then(response => {
      return response.json()
    })
    .then(data => {
      if(data.error === "OK"){
        setRandComic(data);
        //console.log("Right before setting local")
        localStorage.setItem('currRawRandomComic', JSON.stringify(data));
        setWaiting(false)
      }else{
        getRandomComic();
      }
        
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
      <div className="rand-comic" style={randComicStyle}>
          <div className="comic-display-div" style={comicDisplayDivStyle}>
            {/* {(localStorage.getItem('token'))
              ? 
              <Button close
              variant="outline-primary" 
              className="closeComicButton" 
              style={{alignSelf:"flex-end"}} 
              onClick={() => props.toggleModal()}>
              </Button> 
              :
              null
            }
            <br></br> */}
          
            <img className="splash-image"
              src={randComic.results.image.original_url} 
              alt="" 
              style={comicImageStyle}
              onClick={toggle} />
              {waiting 
              ? <Spinner color="light" style={{position:"absolute", left:"46%", top:"40%"}}/>
              : null}
      
            <Button 
              variant="outline-primary" 
              className="randComicButton"  
              style={randComicButtonStyle} 
              onClick={getRandomComic}>
                Take A Chance!
            </Button>

          </div>
          <div>
            <Modal style={addtoshelfmodalStyle} isOpen={modal} toggle={toggle}>
              <ModalHeader className="random-modal-header" toggle={toggle}> 
                <strong>{randComic.results.name}</strong> 
                <br/>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                  <span style={{fontSize:"1rem"}}> 
                    {randComic.results.volume.name} #{randComic.results.issue_number}
                  </span>
                </div>
              </ModalHeader>
              <ModalBody className="random-modal-body">
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
              <ModalFooter className="random-modal-footer" style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <Form>
                  <FormGroup>
                    <Input type="select" name="select"  onChange={(e)=>setComicStatus(e.target.value)}>
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
                    style={addtoshelfbuttonStyle} 
                    onClick={addComic}>
                      Add to Shelf
                  </Button>
                </div>
              </ModalFooter>
            </Modal>
          </div>
        </div>
      : null
    )
  }

  function addComic(){
    // console.log("got to add comic")
    // console.log(comicStatus);

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
  
      // console.log("HERE IS THE COMIC DATA FOR THE DATABASE")
      // console.log(comic_data);
      
      
      if (!localStorage.getItem('token')) {
        //setHasNewComic(true);
        localStorage.setItem('new_comic', JSON.stringify(comic_data));  //adds random comic to local storage
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
          //console.log(response_data)
          props.fetchComics();
        })
        .catch(err => console.log(`Failed comic post to server: ${err}`));
      }
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

  let randShelfDivStyle = 
  {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
  
  let randComicStyle = 
  {
    width: localStorage.getItem('token') ? "20vw" : "40vw",
    paddingTop: localStorage.getItem('token') ? "5px" : "0",
  }

  let randComicButtonStyle = 
    {
      margin: '5px',
      alignSelf: "center",
      backgroundColor: "white",
      color:'black',
      border: 'solid 2px black',
      boxShadow: '6px 6px -2px #000',
      overflow: 'hidden',
      transform:'skew(-5deg)',
      fontFamily: 'Comic Sans MS',
      //marginRight: "50%",
      height: 'auto',
      width: 'auto',
      fontSize: '1rem'

    }
  
  let addtoshelfbuttonStyle =
  {
    margin: '5px',
    alignSelf: "center",
    backgroundColor: 'white',
    border: 'solid 2px black',
    borderRadius: '5px',
    fontFamily: 'Comic Sans MS',
    color: 'black'
  }

  let addtoshelfmodalStyle =
  {
    fontFamily: 'Comic Sans MS',
  }


  let comicDisplayDivStyle = 
    {
      display:"flex", 
      width:  localStorage.getItem('token') ? "20vw" : "40vw", 
      flexDirection:"column", 
      alignItems:"center",
      margin: localStorage.getItem('token') ? "0px" : "auto",
    }

  let comicImageStyle = 
    {
      width:  localStorage.getItem('token') ? "90%" : "22vw", 
      //marginRight: "50%",
      border: localStorage.getItem('token') ? "solid 3px" :"solid 5px",
      borderRadius: "5px",

    }

  return (
    <div style={localStorage.getItem('token') ? randShelfDivStyle : null}>
      {displayComic()}
    </div>
  );
}

export default RandomComic;