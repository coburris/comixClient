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















// import React from 'react';
// import { withRouter } from "react-router-dom";

// const API_URL = "comicvine.gamespot.com/api"
// const API_KEY = "f54468c5a18c035f1c1ab8734536b731c9e2ba0d"
// let heroku_cors = "efa-cors-anywhere.herokuapp.com/"


// class Search extends React.Component {
//     constructor() {
//         super();

//         this.state = {
//             searchResults: [],
//             searchQuery: '',
//             loading: false
//         };

//         this.handleRedirect = this.handleRedirect.bind(this);
//         this.handleChange = this.handleChange.bind(this);
//     }

//     render() {
//         const { searchQuery, loading } = this.state;
//         return (
//             <div className='Search'>
//                 <div>
//                     <input
//                         onChange={this.handleChange}
//                         type="text"
//                         className="Search-input"
//                         value={searchQuery}
//                     />
//                 </div>
//                 {this.renderSearchResults()}
//             </div>
//         );
//     }

//     handleRedirect(volume_id) {
//         this.setState({
//             searchQuery: '',
//             searchResults: [],
//         });

//         this.props.history.push(`/volume/4050-${volume_id}`);
//     }

//     renderSearchResults() {
//         const { searchResults, searchQuery, loading } = this.state;

//         if (!searchQuery) {
//             return '';
//         }

//         if (searchResults.length > 0) {
//             console.log(searchResults);
//             return (
//                 <div className="Search-result-container">
//                     {searchResults.map(result =>
//                         <div
//                             key={result.id}
//                             className="Search-result"
//                             onClick={() => this.handleRedirect(result.id)}
//                         >
//                             {result.name} ({result.count_of_issues} issues) ({result.publisher.name})
//                         </div>
//                     )}
//                 </div>
//             )
//         }

//         // Send no result, only if loading is set to false
//         // To avoid showing no result, when actually there are ones
//         if (!loading) {
//             return (
//                 <div className="Search-result-container">
//                     <div className="Search-no-result">
//                         No results found.
//                     </div>
//                 </div>
//             )
//         }
//     }

//     handleChange(e) {
//         const searchQuery = e.target.value;
//         this.setState({ searchQuery });
//         if (!searchQuery) {
//             return false;
//         }
//         this.setState({ loading: true });
//         fetch(`https//${heroku_cors}${API_URL}/search/?api_key=${API_KEY}&format=json&resources=volume&query=${searchQuery}`)
//             .then(response => {
//                 return response.json().then(json => {
//                     return response.ok ? json : Promise.reject(json);
//                 });
//             })
//             .then((result) => {
//                 console.log(result.results);
//                 this.setState({
//                     searchResults: result.results,
//                     loading: false,
//                 });
//             });
//     }


// }

// export default withRouter(Search);

