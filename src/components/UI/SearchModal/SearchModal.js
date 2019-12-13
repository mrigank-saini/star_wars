import React from 'react';
import classes from './SearchModal.css';
// import Planets from '../Planets/Planets';

const searchModal = props => {
    const renderPlanets = props.searchFlag ? <p>Loading....!!!</p>: null;
    return (
        <React.Fragment>
            <strong>Search: </strong>
            <input 
                type="text" 
                className={classes.searchBar} 
                placeholder="Explore Planets..."
                onKeyUp={props.userKeyPress}
            />
            {renderPlanets}
        </React.Fragment>
    );
}

export default searchModal;