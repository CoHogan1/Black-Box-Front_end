// this file will hold the form to add new vacation
//it will need to be displayed on the landing page.
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
              //console.log(this.state.name)
            }).catch (error => console.error({'Error': error}))
        }
    render() {
        return(
            <div>
                <span className="logo">Logo</span>
<<<<<<< HEAD
            {this.state.toggle ?
                <form onSubmit={this.handleSubmit} className="addNewVacationForm">
                    <h1 className ='welcome'>Welcome Aboard</h1>
                    <input className='new' placeholder='Occassion'name="name" id="name" onChange={(evt)=> this.handleChange(evt)} value={this.state.name}></input>
                    <h1>Start your Vacation</h1>
                    <label></label>
                    <input name="name" id="name" onChange={(evt)=> this.handleChange(evt)} value={this.state.name}></input>
=======

            {this.state.toggle ?
                <form onSubmit={this.handleSubmit} className="addNewVacationForm">

                    <h1 className ='welcome'>Welcome Aboard</h1>

                    <input className='new' placeholder='Occassion'name="name" id="name" onChange={(evt)=> this.handleChange(evt)} value={this.state.name}></input>

                    <h1>Start your Vacation</h1>
                    <label></label>
                    <input name="name" id="name" onChange={(evt)=> this.handleChange(evt)} value={this.state.name}></input>


>>>>>>> a5b58ac1ab9b68446b4aeafe30a60f6256ff485f
                    <label></label>
                    <input className='new' placeholder='location' name="location" id="location" onChange={(evt)=> this.handleChange(evt)} value={this.state.location}></input>
                    <label></label>
                    <input className='new' placeholder='Check in date: YYYY-DD-MM' name="dateFrom"id="dateFrom"  onChange={(evt)=> this.handleChange(evt)} value={this.state.dateFrom}></input>
<<<<<<< HEAD
                    <label></label>
                    <input className='new'placeholder='Check out date: YYYY-DD-MM' name="dateTo" id="dateTo" onChange={(evt)=> this.handleChange(evt)} value={this.state.dateTo}></input><br></br>
                    <input id='main-submit' className="searchInput" type="submit" value="Set Destination"></input>
                    <input className="searchInput" type="submit" value="Search"></input>
=======

                    <label></label>
                    <input className='new'placeholder='Check out date: YYYY-DD-MM' name="dateTo" id="dateTo" onChange={(evt)=> this.handleChange(evt)} value={this.state.dateTo}></input><br></br>


                    <input id='main-submit' className="searchInput" type="submit" value="Set Destination"></input>

                    <input className="searchInput" type="submit" value="Search"></input>


>>>>>>> a5b58ac1ab9b68446b4aeafe30a60f6256ff485f
                </form>
                :
                null
                }
<<<<<<< HEAD
=======


>>>>>>> a5b58ac1ab9b68446b4aeafe30a60f6256ff485f
            </div>
        )
    }
}
<<<<<<< HEAD
=======




>>>>>>> a5b58ac1ab9b68446b4aeafe30a60f6256ff485f
// /* {this.state.currentVacation !== '' &&
//
// <div className="currentVaca">
// <div className="vacaData" >Name: {this.state.currentVacation.name}</div>
// <div className="vacaData" >Where: {this.state.currentVacation.location}</div>
// <div className="vacaData" >From: {this.state.currentVacation.dateFrom}</div>
// <div className="vacaData" >To: {this.state.currentVacation.dateTo}</div>
// </div>
// } */
<<<<<<< HEAD
// }
=======
>>>>>>> a5b58ac1ab9b68446b4aeafe30a60f6256ff485f
