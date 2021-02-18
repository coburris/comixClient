import React, { useEffect, useState} from 'react';
import {Button} from 'reactstrap';

function RandomComic(props) {

  const [randComic, setRandComic] = useState();

  useEffect(() => {
    
    if(!randComic)
      getRandomComic()

  }, []);

  function getRandomComic(){
    let api_key = "10b174a86660d99247de4c3b2117f611aecc1625";
    //let comic_id = '4000-14582';  //Gives Death Masque!
    let comic_id = `4000-${Math.floor(Math.random()*100000)}`
    console.log(`Getting Comic: ${comic_id}`);
    let heroku_cors = "efa-cors-anywhere.herokuapp.com/";
    let url = `https://${heroku_cors}comicvine.gamespot.com/api/issue/${comic_id}/?api_key=${api_key}&format=json`


    fetch(url)
    .then(response => {
      console.log(response.ok);
      return response.json()
    })
    .then(data => {
      console.log(data)
      //setRandComic(data)
      data.error === "OK" ? setRandComic(data) : getRandomComic()
    })
    .catch(err => {
      console.log(`Failed fetch: ${err}`);
      getRandomComic();
    });
  }

  function displayComic(){
    return (
      randComic 
      ? 
        <div>
          <p> {randComic.results.name}</p>
          <p>id: {randComic.results.id}</p>
          <img src={randComic.results.image.original_url} alt="" style={{width:"50vh"}}/>
          <br/>
          <br/>
          <Button variant="outline-primary" onClick={addComic}>Add to Shelf</Button>
        </div>
      : null
    )
  }

  function addComic(){
    console.log("got to add comic")

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

    // Temporary hard coded values
    let owner = 1;
    let status = 0;

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
        status: status
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
      .then(response_data => console.log(response_data))
      .catch(err => console.log(`Failed comic post to server: ${err}`));
    });

  }

  async function getVolume() {
    let api_key = "10b174a86660d99247de4c3b2117f611aecc1625";
    //let comic_id = '4000-14582';  //Gives Death Masque!
    let volume_id = `4050-${randComic.results.volume.id}`
    let heroku_cors = "efa-cors-anywhere.herokuapp.com/";
    let url = `https://${heroku_cors}comicvine.gamespot.com/api/volume/${volume_id}/?api_key=${api_key}&format=json`

    return fetch(url);
  } 

  return (
    <div style={{textAlign:"center"}}>
      {displayComic()}
    </div>
  );
}

export default RandomComic;