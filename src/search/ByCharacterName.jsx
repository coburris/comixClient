import React from 'react';

// "http://comicvine.gamespot.com/api/characters/f54468c5a18c035f1c1ab8734536b731c9e2ba0d&filter=name:,name:hawkeye"
const ByCharacterName = (props) => {

    return(
        <>
        {props.results.map(result => {
            <div key={result._id}>
                <h2>{result.image.medium_url}</h2>
            </div>
        })}
        </>
    )
}

export default ByCharacterName;


















