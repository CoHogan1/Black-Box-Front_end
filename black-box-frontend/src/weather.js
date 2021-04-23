import './App.css'
import React, { Component } from 'react'


export default class Weather extends Component {
    constructor(props){
        super(props)
        this.state = {
            vaca: this.props.vaca,
            query: this.props.vaca.location,
            weather: {}
        }
     

    }

    fetchWeather= async() =>{
        // console.log('before call' ,this.state.query, this.state.vaca.dateFrom)
       await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${this.state.query}&days=5&dt=${this.state.vaca.dateFrom}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "5168948a50msh664513c5262f841p1e6c29jsn7b3a056e3cea",
                "x-rapidapi-host": "weatherapi-com.p.rapidapi.com"
            }
        })
        .then(response => response.json())
        .then(json=> {
            console.log('first response log', json)
            this.setState({
                weather: json.forecast.forecastday[0].day.condition,
                maxTmp: json.forecast.forecastday[0].day.maxtemp_f,
                minTmp: json.forecast.forecastday[0].day.mintemp_f,
                winds: json.forecast.forecastday[0].day.avgvis_miles,
                hum: json.forecast.forecastday[0].day.avghumidity,
                avg:json.forecast.forecastday[0].day.avgtemp_f
            

              })  
            console.log('after it has been set', this.state.weather)
        })
        .catch(err => {
            console.error(err);
        });
    }

    componentDidMount() {
        this.fetchWeather()
    }



    render() {
        console.log('weather in render', this.state.tmp)

        return (
            <div>
            <h1> Expended travel day weather in {this.state.query} </h1>
            <h3><span> <img src={this.state.weather.icon}/></span> {this.state.weather.text}</h3>
            <p> High:{this.state.maxTmp} </p>
            <p> Avg: {this.state.avg} </p>
            <p> Low:{this.state.minTmp} </p>
            <p> Hummidty: {this.state.hum}% </p>
            <p> Winds: {this.state.winds} M.P.H </p>
           
           
           
            </div>
          // <div className= 'weather-container'>
          //   {this.state.weather.map(info=> {
        //         return(
        //             <div className= 'info' key= {info._id}>
        //                 <h1> {info.date} </h1>
        //             </div>
        //         )
        //     })}
        //   </div>
        ) 
    }            

}



