import React from 'react'

class Nav extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            currentVacation: this.props.thisIsAProp
        }
    }

    render(){
        //console.log(this.state.currentVacation + " loging from nav file")
        // console.log(this.props.thisIsAProp.name)
        // console.log(this.props.thisIsAProp.location)
        // console.log(this.props.thisIsAProp.dateFrom)
        // console.log(this.props.thisIsAProp.dateTo)

        return (
            <div className="nav">
            <h1>Black Box Vacations</h1>

            {this.state.currentVacation !== '' &&

                <div className="currentVaca">
                    <div className="vacaData" >Name: {this.state.currentVacation.name}</div>
                    <div className="vacaData" >Where: {this.state.currentVacation.location}</div>
                    <div className="vacaData" >From: {this.state.currentVacation.dateFrom}</div>
                    <div className="vacaData" >To: {this.state.currentVacation.dateTo}</div>
                </div>
            }


            </div>
        )
    }
}

export default Nav
