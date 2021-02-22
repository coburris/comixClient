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

const baseURL = "comicvine.gamespot.com/api"
const key = "f54468c5a18c035f1c1ab8734536b731c9e2ba0d"
let heroku_cors = "efa-cors-anywhere.herokuapp.com/";

const SearchPage = () => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);

    const fetchResults = () => {
        let charUrl = `https://${heroku_cors}${baseURL}/characters/?api_key=${key}&filter=name:${search}&field_list=name`

        fetch(charUrl)
        .then(res => res.json())
        // .then( => 
        //     console.log(),
        //     setResults())
        .catch(err => console.log(err));
    };

    const handleSubmit = (event) => {
        fetchResults();
        event.preventDefault();
    };


    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);


    return(
        <div className="main">
            <div className="mainDiv">
                {/* <form onSubmit={(e) => handleSubmit(e)}> */}
                    {/* <span>Search By:</span>
                    <input type="text" name="search"></input> */}
                {/* // </form> */}

                    <InputGroup>
                    <InputGroupButtonDropdown addonType="prepend" isOpen={dropdownOpen} toggle={toggleDropdown}>
                        <Button outline>Search By:</Button>
                        <DropdownToggle split outline />
                        <DropdownMenu>
                            <DropdownItem>Character Name</DropdownItem>
                            <DropdownItem>Issue</DropdownItem>
                            <DropdownItem>Powers</DropdownItem>
                            <DropdownItem>Publisher</DropdownItem>
                            <DropdownItem>Team</DropdownItem> 
                        </DropdownMenu>
                    </InputGroupButtonDropdown>
                    <Input placeholder="Search"/>
                    <InputGroupAddon addonType="append"><Button color="secondary">Enter Search</Button></InputGroupAddon>
                    </InputGroup>

                    {/* <form onSubmit={(e) => handleSubmit(e)}>
                        <span>Search by Character:</span>
                        <input type="text" name="charsearch" onChange={(e) => setSearch(e.target.value)} required/>
                        <button className="submit">Submit Search</button>
                    </form>
                    {
                        results.length > 0 ? <ByCharacterName results={results}/> : null
                    } */}

                This is the Search Page
            </div>
        </div>
    )
}



export default SearchPage;







