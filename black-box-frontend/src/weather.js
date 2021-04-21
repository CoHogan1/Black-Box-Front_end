import './App.css'
import React, { Component } from 'react'


export default class Weather extends Component {
    constructor(props){
        super(props)
        this.state = {
            vaca: this.props.vaca,
            query: this.props.vaca.location,
        }
    }

    dataCheck = () =>{
        console.log("clicked")
        console.log(this.state.query)
        const query = this.state.query.toLowerCase()
        const apiUrl = "https://community-open-weather-map.p.rapidapi.com/find?q=" + query + "&cnt=0&mode=null&lon=0&type=link%2C%20accurate&lat=0&units=imperial%2C%20metric"
        console.log(apiUrl);
        fetch( apiUrl, {
    	"method": "GET",
    	"headers": {
    		"x-rapidapi-key": "default-application-5200662",
    		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
    	}
        })
        .then(response => {
        	console.log(response);
        })
        .catch(err => {
        	console.error(err);
        });

    }


    render(){
        return (
            <div className="allWeather">
                <div className="days">
                    <button onClick={this.dataCheck}>here</button>
                    <p>{this.state.vaca.name}</p>
                    <p>{this.state.vaca.location}</p>
                    <p>{this.state.vaca.dateFrom}</p>
                    <p>{this.state.vaca.dateTo}</p>
                </div>
            </div>
        )
    }
}



// api key


//  0f582a0705359296dafbeafebc8d12a2

// api.openweathermap.org/data/2.5/weather?q={city name}&appid=0f582a0705359296dafbeafebc8d12a2
