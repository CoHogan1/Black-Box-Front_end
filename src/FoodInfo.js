import React, {Component} from 'react'

class FoodInfo extends Component {
	constructor(props) {
		super(props)
		this.state={
			hello: true
		}

	}

	render() {
		return (
			<React.Fragment>
				<div>
					{this.props.restaurants.map(restaurant => {
						return (
							<div className='restaurant'>

							  <h1> {restaurant.restaurant_name}</h1>
							  <h1> {restaurant.hours} </h1>
							  <h1> {restaurant.cuisnes} </h1>
							  <h1> {restaurant.restaurant_phone} </h1>
							</div>
						)
					})}
				</div>
			</React.Fragment>
		)
	}
}

export default FoodInfo
