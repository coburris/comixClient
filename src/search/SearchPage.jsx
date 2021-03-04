import React, { useState, useEffect } from 'react';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    Input,
    Button,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
    } from 'reactstrap';
import ByCharacterName from './ByCharacterName';
import SearchComic from './SearchComic'

const baseURL = "comicvine.gamespot.com/api"
const key = "f54468c5a18c035f1c1ab8734536b731c9e2ba0d"
let heroku_cors = "efa-cors-anywhere.herokuapp.com/";
// http://comicvine.gamespot.com/api/characters/?api_key=f54468c5a18c035f1c1ab8734536b731c9e2ba0d&sort=name

const SearchPage = (props) => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [comicData, setComicData] = useState([]);
    

    //if true byIssue : byPublisher

    



    const fetchResults = () => {
        //   --->   search for exact issue by issue num     https://comicvine.gamespot.com/api/issue/4000-14582/?api_key=${key}&format=json

        // let charUrl = `https://${heroku_cors}${baseURL}/powers/?api_key=${key}&format=json&filter=name:${search}&field_list=name`
        // let charUrl = https://comicvine.gamespot.com/api/search/?api_key=10b174a86660d99247de4c3b2117f611aecc1625&format=json&field_list=name,id,image,volume&resources=issue&query=Aquaman
        let charUrl = `https://${heroku_cors}${baseURL}/search/?api_key=${key}&format=json&resources=issue&query=${search}&limit=5&page=${pageNumber}`


        fetch(charUrl)
        .then((res) => {
            console.log("anything")
            return(res.json());
        })
        .then(json => 
        {
            console.log(json.results)
            setResults(json.results)
        }
        )
        .catch(err => console.log(err));
    };

    const comicsMapper = () => {

        
        return results.map((comic, index) => {
            
            
            let comic_data = 
        {
            issue_id: comic.id,
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

                return(

                    <SearchComic comic={comic_data} index={index} setAuthModal={props.setModal}/>
                )
            })
    }
    
    const handleSubmit = (event) => {
        fetchResults();
        event.preventDefault();
        setPageNumber(0);
    };


    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);


    const changePageNumber = (event, direction) => {
        event.preventDefault()
        if (direction === 'down') {
            if (pageNumber > 0) {
                setPageNumber(pageNumber - 1);
                fetchResults();
            }
        }
        if (direction === 'up') {
            setPageNumber(pageNumber + 1);
            fetchResults();
        }
    }


    return(
        <div className="main">
            <div className="mainDiv">
                {/* <form onSubmit={(e) => handleSubmit(e)}> */}
                    {/* <span>Search By:</span>
                    <input type="text" name="search"></input> */}
                {/* // </form> */}

                    {/* <InputGroup>
                        <InputGroupAddon outline>Search for a Comic:</InputGroupAddon>
                    <Input placeholder="Search" onChange={(e) => setSearch(e.target.value)} required/>
                    <InputGroupAddon addonType="append"><Button color="secondary" onClick={(e) => handleSubmit(e)}>Submit Search</Button></InputGroupAddon>
                    </InputGroup> */}

                    
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <br/>
                        {/* <InputGroupAddon className="top-left" addonType="prepend"> Search for a Comic: </InputGroupAddon> */}
                        <Input placeholder="Search" type="text" name="charsearch" onChange={(e) => setSearch(e.target.value)} required/>
                        <Button style={searchButtonStyle} className="submit">Submit Search</Button>
                    </form>
                    <br/>
                    <br/>
                    <br/>
                    {
                        (results) ? comicsMapper() : <>Empty</>
                    }
                    <br/>
                    <br/>
                    <div className="search-welcome">
                    <blockquote className= 'robin-speech-bubble'>What should we search for, Batman?</blockquote>
                    <img className="robin" src="/images/robin_image2.png" alt="Robin"></img>
                </div>
            </div>
        </div>
    )
}

//STYLE

const searchButtonStyle =
{
    backgroundColor: "#338ef5",
    color: 'white',
    border:  'solid 1px white',
    borderRadius: '5px',
    fontFamily: 'Comic Sans MS'
}

const searchTextStyle =
{
    fontFamily: 'Comic Sans MS',
    color: 'white',  
}

const prepend =
{
    backgroundColor: "#338ef5",
    color: 'white',
    border:  'solid 1px white',
    borderRadius: '5px',
    fontFamily: 'Comic Sans MS'
}









export default SearchPage;







