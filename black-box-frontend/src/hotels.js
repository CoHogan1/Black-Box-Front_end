import './App.css'
import React, { Component } from 'react'
// conditional rendering. Cannot render this until data is stored.

export default class Hotel extends Component {
    constructor(props){
        super(props)
        this.state = {
            vaca: this.props.vaca
        }
    }

    render(){
        return(
            <div className="hotelData">
            <div className="hotel" >Hotel #1
                <p>{this.state.vaca.name}</p>
                <p>{this.state.vaca.location}</p>
                <p>{this.state.vaca.dateFrom}</p>
                <p>{this.state.vaca.dateTo}</p>
            </div>
            </div>
        )
    }
}
