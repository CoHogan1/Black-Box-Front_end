import './App.css'
import React, { Component } from 'react'


export default class Weather extends Component {
    constructor(props){
        super(props)
        this.state = {
            vaca: this.props.vaca,
            query: this.props.vaca.location,
            weather: []
        }
    }

    fetchWeather = () =>{
       fetch(`https://community-open-weather-map.p.rapidapi.com/forecast?q=${this.state.query}`, {
            "method": "GET",
            "headers": {
            "x-rapidapi-key": "5168948a50msh664513c5262f841p1e6c29jsn7b3a056e3cea",
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
            }
        })
        .then(response => response.json())
        .then(json => {
            
            console.log(' response', json)
        })
        .catch(err => {
            console.error(err);
        });
    }

    componentDidMount() {
        this.fetchWeather()
    }



    render() {
        console.log('weather in r', this.state.weather)
        return (
          <h1> weather </h1>
        ) 
    }            

}



