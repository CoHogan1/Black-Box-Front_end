import './App.css'
import React, { Component } from 'react'


export default class Hotel extends Component {
    constructor(props){
        super(props)
        this.state = {
            vaca: this.props.vaca,
            hotels: [],
        }
    }

    fetchHotels = async () => {
      console.log(this.state.vaca.location )
      console.log(this.state.vaca.dateFrom)
      console.log(this.state.vaca.dateTo)
      fetch(`https://hotels-com-provider.p.rapidapi.com/v1/destinations/search?locale=en_US&currency=USD&query=${this.state.vaca.location}`,{
        "method": "GET",
        "headers": {
          "x-rapidapi-key": "1100ee3563msh306384d3f712ffdp121f25jsncc28e308216a",// this api key needs updating...
          "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com"
        }
      })

      .then(response => response.json())
      .then(json =>{
        console.log (json.suggestions[0].entities[1].destinationId)
        let destination = json.suggestions[0].entities[1].destinationId
        console.log(`this is destination ${json.suggestions[0].entities[1].destinationId}`)
        return fetch(`https://hotels-com-provider.p.rapidapi.com/v1/hotels/search?adults_number=1&checkin_date=${this.state.vaca.dateFrom}&destination_id=${destination}&checkout_date=${this.state.vaca.dateTo}&currency=USD&locale=en_US&sort_order=STAR_RATING_HIGHEST_FIRST`, {
          "method": "GET",
          "headers": {
          "x-rapidapi-key": "1100ee3563msh306384d3f712ffdp121f25jsncc28e308216a",
          "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com"
          }
        })
      })
      .then(response => response.json())
      .then(json => {
        console.log('hello response', json)
        this.setState ({
        hotels: json.searchResults.results

        })
      console.log('here is the hotels', this.state.hotels)
    })
  }


  componentDidMount(){
    this.fetchHotels()
  }

  render() {
    console.log('inside render', this.state.hotels)
    return (
      <div>
            {
              this.state.hotels.map(hotel=> {
                return (
                  <div className='hotels'>

                    <h1> Name : {hotel.name} </h1>
                        <div className='address'>
                          <h2> address: {hotel.address.streetAddress} </h2>
                          <p> Zip Code: {hotel.address.postalCode} </p>
                          <p> star Rating : {hotel.starRating} </p>
                        </div>
                  </div>
                )
            })}
      </div>
    )
  }
}
