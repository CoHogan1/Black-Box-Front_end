import './App.css'
import React, { Component } from 'react'
import FoodInfo from './FoodInfo'


export default class Hotel extends Component {
    constructor(props){
        super(props)
        this.state = {
            vaca: this.props.vaca,
            hotels: [],
            restaurants: []
        }
    }

    fetchHotels =  () => {
      console.log(this.state.vaca.location )
      console.log(this.state.vaca.dateFrom)
      console.log(this.state.vaca.dateTo)
      fetch(`https://hotels-com-provider.p.rapidapi.com/v1/destinations/search?locale=en_US&currency=USD&query=${this.state.vaca.location}`,{
        "method": "GET",
        "headers": {
          "x-rapidapi-key": "5168948a50msh664513c5262f841p1e6c29jsn7b3a056e3cea",// this api key needs updating...
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
          "x-rapidapi-key": "5168948a50msh664513c5262f841p1e6c29jsn7b3a056e3cea",
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

                    <img src= {hotel.optimizedThumbUrls.srpDesktop} />
                    <h1> Name : {hotel.name} 
                    <span> 
                      <button
                        onClick={async(event)=> {
                        
                          await console.log('before' ,this.state )
                          await this.setState ({
                            chosenHotel: hotel.name,
                            zipCode: hotel.address.postalCode
                          })
                          
                          console.log('after state has been changed', this.state)

                            const food = await fetch(`https://us-restaurant-menus.p.rapidapi.com/restaurants/zip_code/${this.state.zipCode}?page=1`, {
                              "method": "GET",
                              "headers": {
                              "x-rapidapi-key": "795f80971amshb1391e4caeb5a9ep12537bjsn967a63f3bd1a",
                              "x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com"
                                }
                            })
                          console.log(food)
                          
                          const parsedFood = await food.json()
                        
                          console.log(parsedFood) 

                          await this.setState({
                            restaurants: parsedFood.result.data
                          })

                          await console.log ('final log', this.state.restaurants)
                          
                        
                        }}
                        >Select ths hotel
                      </button> 
                    </span>
                    </h1>
                        <div className='address'>
                          <h2> address: {hotel.address.streetAddress} </h2>
                          <p> Zip Code: {hotel.address.postalCode} </p>
                          <p> star Rating : {hotel.starRating} </p>
                        </div>
                  </div>
                )
            })}
          {(this.state.restaurants)
          ? <FoodInfo restaurants={this.state.restaurants}/>

          : ''
        } 
      </div>
    )
  }
}
