// this file will hold the form to add new vacation
//it will need to be displayed on the landing page.
import './App.css'
import React, { Component } from 'react'


export default class VacationForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: "",
            location: '',
            dateFrom: '',
            dateTo: '',
        }
    }

    // this should store the form info into this.state.
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // handles form submitting, this should add the vacation info to the db...
    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.props.baseURL + '/blackbox');
        // console.log(this.state.name)
        // console.log(this.state.location)
        // console.log(this.state.dateFrom)
        // console.log(this.state.dateTo)

        fetch(this.props.baseURL + '/blackbox', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                location: this.state.location,
                dateFrom: this.state.dateFrom,
                dateTo: this.state.dateTo
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( res => {
          return res.json()
        }).then(data => {
              this.props.addVacation(data)
              this.setState({
                name: '',
                location: '',
                dateFrom: '',
                dateTo: '',
              })
            }).catch (error => console.error({'Error': error}))
        }

    render() {
        return(
            <div>

            <form onSubmit={this.handleSubmit} className="addNewVacationForm">
            <h1>This form adds a vacation.</h1>

                <label>Name:</label>
                <input name="name" id="name" onChange={(evt)=> this.handleChange(evt)} ></input><br></br>

                <label>location:</label>
                <input name="location" id="location" onChange={(evt)=> this.handleChange(evt)} ></input><br></br>

                <label>Date From:</label>
                <input name="dateFrom"id="dateFrom"  onChange={(evt)=> this.handleChange(evt)} ></input><br></br>

                <label>Date To:</label>
                <input name="dateTo" id="dateTo" onChange={(evt)=> this.handleChange(evt)} ></input><br></br>

                <input type="submit" value="Visit"></input>

            </form>

            </div>
        )
    }
}
