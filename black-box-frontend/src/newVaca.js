// this file will hold the form to add new vacation
//it will need to be displayed on the landing page.
import './App.css'
import React, { Component } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'




export default class VacationForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: "",
            location: '',
            dateFrom: '',
            dateTo: '',
            toggle: true,
            currentVacation: this.props.thisIsAProp

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
        if (this.state.name === '') {
            alert('Please fill out form')
            return
        }
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
              //console.log(this.state.name);
            }).catch (error => console.error({'Error': error}))
            this.setState({
                toggle: !this.state.toggle
            })
            console.log(this.state.name)
            console.log(this.state.toggle)
            //window.location.reload(false)// https://upmostly.com/tutorials/how-to-refresh-a-page-or-component-in-react
        }

    render() {
        return(
            <div>

                <span className="logo">Logo</span>


            {this.state.toggle ?
                <form onSubmit={this.handleSubmit} className="addNewVacationForm">
                    <h1>Start your Vacation</h1>
                        <label>Name:</label>
                        <input name="name" id="name" onChange={(evt)=> this.handleChange(evt)} value={this.state.name} />
               
                    <label>location:</label>
                    <input name="location" id="location" onChange={(evt)=> this.handleChange(evt)} value={this.state.location}></input>

                    <label>Date From:</label>
                    <input name="dateFrom"id="dateFrom"  onChange={(evt)=> this.handleChange(evt)} value={this.state.dateFrom}></input>

                    <label>Date To:</label>
                    <input name="dateTo" id="dateTo" onChange={(evt)=> this.handleChange(evt)} value={this.state.dateTo}></input><br></br>

                    <input className="searchInput" type="submit" value="Search"></input>

                </form>
                :
                null
                }

{/* {this.state.currentVacation !== '' &&

<div className="currentVaca">
    <div className="vacaData" >Name: {this.state.currentVacation.name}</div>
    <div className="vacaData" >Where: {this.state.currentVacation.location}</div>
    <div className="vacaData" >From: {this.state.currentVacation.dateFrom}</div>
    <div className="vacaData" >To: {this.state.currentVacation.dateTo}</div>
</div>
} */}



            </div>
        )
    }
}
