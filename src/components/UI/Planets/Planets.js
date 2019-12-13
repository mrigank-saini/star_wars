import React from 'react';
import classes from './Planets.module.css';

const planets = props => {
    console.log(props.results.count);
    
    return (
        props.results.count ?  props.results.results.map(cur => {
            return (
                <div className={classes.popClass} key={cur.name}>
                    <p>Name: {cur.name}</p>
                    <p>Diameter: {cur.diameter}</p>
                    <p>Climate: {cur.climate}</p>
                    <p className={(+cur.population > 100000) ? classes.Highlight: ''}>Population: {cur.population}</p>
                    <hr/>
                </div>
            )
        }) : <p> No Planets Found</p>
    );
}

export default planets;