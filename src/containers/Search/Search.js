import React, { Component } from 'react';
import SearchModal from '../../components/UI/SearchModal/SearchModal';
import axios from '../../axios-instance';
import Planets from '../../components/UI/Planets/Planets';


class Search extends Component {

    state = {
        value: '',
        fetchData: false,
        searchFlag: false,
        results: []
    }

    getSearchResults = async() => {
        let response = null;
        console.log("getSearchResults called");
        try {
            // debugger
            //For everykeystroke, clear prev results
            this.setState({results: [], fetchData: !this.state.fetchData});
            // debugger
            if(this.state.value){
                console.log("Inside Final");
                response = await axios.get(`/planets/?search=${this.state.value}`);
                    if(response.data){
                        console.log(response.data);
                        // debugger
                        this.setState({results: response.data, fetchData: true, searchFlag: !this.state.searchFlag})
                        }
                    }
            // console.log(response.data);
        }catch(error){
             alert('Some error occured'+error);
        }   
    }

    async componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate called');
        if(prevState.value !== this.state.value){
             await this.getSearchResults();
        }

    }

    getPlanets = (event) => {
        // this.setState((prevState, props) => ({value: event.target.value, searchFlag: !prevState.searchFlag}));
        if(event.target.value.trim().length > 0) {
            const updatedValue = event.target.value.trim();
            console.log('coming'+event.target.value.trim());
            this.setState({value: updatedValue, searchFlag: true});
            // this.setState({value: updatedValue});
        }
        else{
            this.setState({searchFlag: false});
        }
    }
    
    render () { 
        console.log('Render Called');
        return (
            <React.Fragment>
                <p>Welcome {localStorage.getItem("username")}...!!!</p>
                <SearchModal userKeyPress={(e) => this.getPlanets(e)}
                    searchFlag={this.state.searchFlag}/>
                    {this.state.fetchData ? <Planets results={this.state.results}/>: '' }
                    {console.log('againRendered '+this.state.fetchData)}
            </React.Fragment>
        );
    }
}

export default Search;