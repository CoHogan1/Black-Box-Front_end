import React from 'react'

class Nav extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            currentVacation: this.props.thisIsAProp
        }
    }

    render(){
        console.log(this.state.currentVacation + " loging from nav file")
        console.log(this.props.thisIsAProp.name)
        console.log(this.props.thisIsAProp.location)
        console.log(this.props.thisIsAProp.dateFrom)
        console.log(this.props.thisIsAProp.dateTo)

        return (
            <div className="nav">
                <h1>NavBar</h1>

            <p>{this.state.currentVacation.name}</p>



                <div className="cart">
                    <p>Vacation</p>
                </div>
            </div>
        )
    }
}

export default Nav
